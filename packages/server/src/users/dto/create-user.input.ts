import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @MinLength(3)
  @MaxLength(40)
  @Field()
  name: string;
}
