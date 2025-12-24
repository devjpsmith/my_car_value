import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { PatchUserDto } from './patchUserDto';

export class CreateUserDto extends PatchUserDto{
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;
}
