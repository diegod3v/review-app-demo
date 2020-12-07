import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  label: string;
  @ManyToMany(() => Restaurant, (restaurant) => restaurant.tags)
  restaurants: Restaurant;
}
