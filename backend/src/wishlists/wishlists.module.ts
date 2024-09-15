import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from '../wishlists/entities/wishlist.entity';
import { User } from './../users/entities/user.entity';
import { Wish } from './../wishes/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WishList, User, Wish])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
  exports: [WishlistsService],
})
export class WishlistsModule {}
