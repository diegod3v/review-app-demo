import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @MinLength(3)
  @MaxLength(40)
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;
}
