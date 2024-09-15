import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserResponseDto } from './dto/signin-user-response.dto';
import { SignupUserResponseDto } from './dto/signup-user-response.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Req() req): Promise<SigninUserResponseDto> {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserResponseDto> {
    return await this.usersService.create(createUserDto);
  }
}
