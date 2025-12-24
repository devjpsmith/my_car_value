import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConstraintViolationException } from '../lib/errors/constraint-violation.exception';
import { EntityNotFoundException } from '../lib/errors/entity-not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    try {
      const user = this.repo.create({ email, password });
      await this.repo.save(user);
      return user;
    } catch (error) {
      if (error instanceof Error)
        if (error.message.includes('UNIQUE constraint failed'))
          throw new ConstraintViolationException('User already exists');
      throw error;
    }
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user)
      throw new EntityNotFoundException(`User with id ${id} not found`);
    return user;
  }

  async find(email: string): Promise<User[]> {
    const users = await this.repo.findBy({ email });
    if (!users || !users.length)
      throw new EntityNotFoundException(`User with email ${email} not found`);
    return users;
  }

  async update(id: number, update: Partial<User>) {
    const user = await this.findOne(id);
    const updatedUser = this.repo.create({ ...user, ...update });
    await this.repo.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.repo.remove(user);
  }
}
