import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserWishesDto } from './dto/user-wishes.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async find(@Req() req): Promise<UserProfileResponseDto> {
    return await this.usersService.findOneById(req.user.id);
  }

  @Patch('me')
  async update(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    return await this.usersService.updateOneById(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  async findMyWishes(@Req() req): Promise<Wish[]> {
    return await this.usersService.findWishes(req.user.id);
  }

  @Get(':username')
  async FindByUserName(
    @Param('username') username: string,
  ): Promise<UserPublicProfileResponseDto> {
    const userFound = await this.usersService.findByUserName(username);
    delete userFound.password;
    return userFound;
  }

  @Get(':username/wishes')
  async findUserWishes(
    @Param('username') username: string,
  ): Promise<UserWishesDto[]> {
    const { id } = await this.usersService.findByUserName(username);
    return await this.usersService.findWishes(id);
  }

  @Post('find')
  async findMany(
    @Body() findUserDto: FindUsersDto,
  ): Promise<UserPublicProfileResponseDto[]> {
    return await this.usersService.findMany(findUserDto.query);
  }
}
