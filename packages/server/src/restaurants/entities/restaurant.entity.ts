import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { Tag } from './tags.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  website: string;
  @Column({ nullable: true })
  kitchen: string;
  @ManyToMany(() => Tag, (tag) => tag.restaurants)
  @JoinTable()
  tags: Tag[];
  @OneToMany(() => Review, (review) => review.restaurant)
  reviews?: Review;
}
