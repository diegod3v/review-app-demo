import { Field, InputType } from '@nestjs/graphql';
import { MinLength, MaxLength } from 'class-validator';
@InputType()
export class CreateRestaurantInput {
  @MinLength(3)
  @MaxLength(50)
  @Field()
  name: string;
}
