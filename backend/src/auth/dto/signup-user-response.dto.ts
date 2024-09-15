import {
  IsNotEmpty,
  IsInt,
  IsString,
  Length,
  IsUrl,
  IsEmail,
  IsDate,
} from 'class-validator';

export class SignupUserResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  about: string;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
