import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, Max, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @IsDateString()
  @Field()
  date: Date;

  @MinLength(3)
  @MaxLength(250)
  @Field()
  comment: string;

  @Min(0)
  @Max(5)
  @Field()
  rate: number;
}
