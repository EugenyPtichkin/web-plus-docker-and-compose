import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsBoolean()
  hidden: boolean;

  @IsNotEmpty()
  @IsNumber()
  itemId: number;
}
