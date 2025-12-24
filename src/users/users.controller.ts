import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { PatchUserDto, CreateUserDto, UserDto } from './user.dto';
import { UsersService } from './users.service';
import { BadRequestExceptionFilter } from '../lib/filters/bad-request-exception.filter';
import { NotFoundExceptionFilter } from '../lib/filters/not-found-exception.filter';
import { Serialize, SerializeInterceptor } from '../lib/interceptors/serialize.interceptor';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @UseFilters(new BadRequestExceptionFilter())
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return await this.usersService.create(email, password);
  }

  @Get(':id')
  @UseFilters(new NotFoundExceptionFilter())
  async findUser(@Param('id') id: string) {
    return await this.usersService.findOne(parseInt(id));
  }

  @Get('search/:email')
  @UseFilters(new NotFoundExceptionFilter())
  async searchUsers(@Param('email') email: string) {
    return await this.usersService.find(email);
  }

  @Patch(':id')
  @UseFilters(new NotFoundExceptionFilter())
  async updateUser(
    @Param('id') id: string,
    @Body() patchUserDto: PatchUserDto,
  ) {
    return await this.usersService.update(parseInt(id), patchUserDto);
  }

  @Delete(':id')
  @UseFilters(new NotFoundExceptionFilter())
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
