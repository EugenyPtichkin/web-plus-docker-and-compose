import {
  IsNotEmpty,
  IsInt,
  IsDate,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  IsArray,
  Min,
} from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';

export class UserWishesDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @IsNotEmpty()
  @Length(1, 250)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  raised: number;

  @IsNotEmpty()
  @IsInt()
  copied: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 1024)
  description: string;

  @IsArray()
  offers: Offer[];
}
