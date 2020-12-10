import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Review {
  @Field(() => ID)
  id: string;
  @Field()
  date: string;
  @Field()
  comment: string;
  @Field()
  rate: number;
  @Field(() => User, { nullable: true })
  user?: User;
}
