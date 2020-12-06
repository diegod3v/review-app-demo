import { CreateRestaurantInput } from './create-restaurant.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {}
