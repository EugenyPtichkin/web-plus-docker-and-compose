import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { JwtGuard } from './../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(
    @Body() createOfferDto: CreateOfferDto,
    @Req() req,
  ): Promise<Offer> {
    return await this.offersService.create(req.user.id, createOfferDto);
  }

  @Get()
  async findAll(): Promise<Offer[]> {
    return await this.offersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Offer> {
    return await this.offersService.findOneById(id);
  }
}
