import { Field, InputType } from '@nestjs/graphql';
import { MinLength, MaxLength, IsPhoneNumber, IsUrl } from 'class-validator';
@InputType()
export class CreateRestaurantInput {
  @MinLength(3)
  @MaxLength(50)
  @Field()
  name: string;
  @MinLength(3)
  @MaxLength(140)
  @Field()
  description: string;
  @IsPhoneNumber('US')
  @Field()
  phone: string;
  @IsUrl()
  @Field()
  website: string;
  @Field()
  kitchen: string;
}
