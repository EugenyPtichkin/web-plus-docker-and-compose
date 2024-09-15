import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  password: string;
}
