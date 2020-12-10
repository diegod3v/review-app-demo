import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  thumbnail: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  website: string;
  @OneToMany(() => Review, (review) => review.restaurant)
  reviews?: Review;
}
