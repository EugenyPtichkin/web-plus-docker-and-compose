import { IsNotEmpty, IsString, IsJWT } from 'class-validator';

export class SigninUserResponseDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  access_token: string;
}
