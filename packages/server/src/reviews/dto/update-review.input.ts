import { CreateReviewInput } from './create-review.input';
import { PartialType } from '@nestjs/graphql';

export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  id: number;
}
