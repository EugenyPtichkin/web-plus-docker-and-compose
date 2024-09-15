import { IsString, IsUrl, IsArray, IsInt } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsArray()
  @IsInt()
  itemsId: number[];
}
