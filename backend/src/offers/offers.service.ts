import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { Wish } from './../wishes/entities/wish.entity';
import { User } from './../users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(userId: number, createOfferDto: CreateOfferDto) {
    const { itemId, amount } = createOfferDto;
    const wish = await this.wishRepository.findOne({
      relations: { owner: true },
      where: { id: itemId },
    });
    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }
    if (wish.owner.id === userId) {
      throw new BadRequestException('Нельзя скинуться на свой подарок');
    }
    const newRaised = Number(wish.raised) + Number(amount);
    if (newRaised > wish.price) {
      throw new BadRequestException('Сумма с учетом заявки превысит требуемую');
    }
    await this.wishRepository.update(wish.id, { raised: newRaised });

    const updatedWish = await this.wishRepository.findOne({
      relations: { owner: true },
      where: { id: itemId },
    });
    delete updatedWish.owner.password;

    const user = await this.userRepository.findOne({
      relations: { wishes: true },
      where: { id: userId },
    });
    delete user.password;

    const newOffer = await this.offerRepository.save({
      ...createOfferDto,
      user: user,
      item: updatedWish,
    });
    return newOffer;
  }

  async findAll() {
    return await this.offerRepository.find({
      relations: {
        user: true,
        item: true,
      },
    });
  }

  async findOneById(offerId: number) {
    const offer = await this.offerRepository.findOne({
      relations: {
        user: true,
        item: true,
      },
      where: {
        id: offerId,
      },
    });
    if (!offer) {
      throw new NotFoundException('Offer не найден');
    }
    return offer;
  }
}
