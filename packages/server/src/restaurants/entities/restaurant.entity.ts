import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Review, (review) => review.restaurant)
  reviews?: Review;
}
