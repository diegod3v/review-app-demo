import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Review } from './review.model';

@ObjectType()
export class Restaurant {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field({ nullable: true })
  phone?: string;
  @Field({ nullable: true })
  website?: string;
  @Field()
  thumbnail: string;
  @Field(() => [Review])
  reviews?: Review[];
}
