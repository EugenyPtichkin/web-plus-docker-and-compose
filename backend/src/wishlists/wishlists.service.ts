import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WishList } from './entities/wishlist.entity';
import { Wish } from './../wishes/entities/wish.entity';
import { User } from './../users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishList)
    private wishListRepository: Repository<WishList>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.wishListRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  async create(userId: number, createWishlistDto: CreateWishlistDto) {
    const { name, image, itemsId } = createWishlistDto;
    const items = await this.wishRepository.find({
      where: { id: In(itemsId) },
    });
    const owner = await this.userRepository.findOneBy({ id: userId });
    const newWishlist = await this.wishListRepository.save({
      name,
      image,
      owner,
      items,
    });
    return newWishlist;
  }

  async findOneById(wishListId: number) {
    const wishList = await this.wishListRepository.findOne({
      relations: {
        owner: true,
        items: true,
      },
      where: { id: wishListId },
    });
    return wishList;
  }

  async updateOneById(
    wishListId: number,
    userId: number,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.wishListRepository.findOneBy({
      id: wishListId,
    });
    if (!wishlist) {
      throw new NotFoundException('Whishlist не найден');
    }
    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(
        'Wishlist может редактировать только владелец',
      );
    }
    const { name, image, itemsId } = updateWishlistDto;
    const wishes = await this.wishRepository.find({
      where: { id: In(itemsId) },
    });
    await this.wishListRepository.save({
      ...wishlist,
      name: name,
      image: image,
      items: wishes,
    });
    return this.wishListRepository.findOneBy({ id: wishListId });
  }

  async removeOneById(wishListId: number, userId: number) {
    const wishListToBeRemoved = await this.wishListRepository.findOne({
      relations: {
        owner: true,
        items: true,
      },
      where: { id: wishListId },
    });
    if (!wishListToBeRemoved) {
      throw new NotFoundException('Whishlist не найден');
    }
    if (wishListToBeRemoved.owner.id !== userId) {
      throw new BadRequestException('Wishlist может удалить только владелец');
    }
    await this.wishListRepository.remove(wishListToBeRemoved);
    return wishListToBeRemoved;
  }
}
