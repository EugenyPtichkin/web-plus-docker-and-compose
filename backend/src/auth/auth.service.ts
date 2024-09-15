import { Injectable } from '@nestjs/common';
import { User } from './../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashService } from './../hash/hash.service';
import { SigninUserResponseDto } from './dto/signin-user-response.dto';
import { SignupUserResponseDto } from './dto/signup-user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private hashService: HashService,
  ) {}

  async auth(user: User): Promise<SigninUserResponseDto> {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async validatePassword(
    username: string,
    password: string,
  ): Promise<SignupUserResponseDto> {
    const user = await this.usersService.findByUserName(username);
    if (user && this.hashService.compare(password, user.password)) {
      // eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
