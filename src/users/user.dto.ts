import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class PatchUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  password: string;
}

export class CreateUserDto extends PatchUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;
}

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
