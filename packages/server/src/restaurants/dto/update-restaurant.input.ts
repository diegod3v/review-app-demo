import { CreateRestaurantInput } from './create-restaurant.input';
import { PartialType } from '@nestjs/graphql';

export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  id: number;
}
