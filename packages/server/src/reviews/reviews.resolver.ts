import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';

@Resolver('Review')
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation('createReview')
  create(@Args('createReviewInput') createReviewInput: CreateReviewInput) {
    return this.reviewsService.create(createReviewInput);
  }

  @Query('reviews')
  findAll() {
    return this.reviewsService.findAll();
  }

  @Query('review')
  findOne(@Args('id') id: number) {
    return this.reviewsService.findOne(id);
  }

  @Mutation('updateReview')
  update(@Args('updateReviewInput') updateReviewInput: UpdateReviewInput) {
    return this.reviewsService.update(updateReviewInput.id, updateReviewInput);
  }

  @Mutation('removeReview')
  remove(@Args('id') id: number) {
    return this.reviewsService.remove(id);
  }
}
