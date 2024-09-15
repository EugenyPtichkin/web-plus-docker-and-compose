import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishList } from './entities/wishlist.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll(): Promise<WishList[]> {
    return this.wishlistsService.findAll();
  }

  @Post()
  async create(
    @Req() req,
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<WishList> {
    return await this.wishlistsService.create(req.user.id, createWishlistDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<WishList> {
    return await this.wishlistsService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req,
  ): Promise<WishList> {
    return this.wishlistsService.updateOneById(
      id,
      req.user.id,
      updateWishlistDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req): Promise<WishList> {
    return await this.wishlistsService.removeOneById(id, req.user.id);
  }
}
