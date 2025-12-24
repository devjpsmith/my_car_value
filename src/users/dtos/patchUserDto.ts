import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PatchUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  password: string;
}
