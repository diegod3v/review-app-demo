import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  date: string;
  @Column('text')
  comment: string;
  @Column()
  rate: number;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  restaurant: Restaurant;
  @ManyToOne(() => User, { eager: true })
  user: User;
}
