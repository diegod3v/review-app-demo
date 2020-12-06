import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  date: Date;
  @Column('text')
  comment: string;
  @Column()
  rate: number;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  restaurant: Restaurant;
}
