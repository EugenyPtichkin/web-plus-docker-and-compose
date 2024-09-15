import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Length, IsUrl, Min, IsDecimal } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { WishList } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    default: 0,
    type: 'decimal',
    scale: 2,
  })
  @Min(0)
  price: number;

  @Column({
    default: 0,
    type: 'decimal',
    scale: 2,
  })
  @Min(0)
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offers) => offers.item)
  offers: Offer[];

  @Column({
    type: 'int',
    default: 0,
  })
  @IsDecimal()
  copied: number;

  @ManyToMany(() => WishList, (wishlists) => wishlists.items)
  @JoinTable()
  wishlist: WishList[];
}
