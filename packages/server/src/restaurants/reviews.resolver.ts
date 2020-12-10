import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { Review } from './models/review.model';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-gql.guard';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review, { name: 'createReview' })
  @UseGuards(GqlAuthGuard)
  create(
    @Args('restaurantId', { type: () => ID }) restaurantId: string,
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @CurrentUser() user: User,
  ) {
    console.log('USER RESOLVER', user);
    return this.reviewsService.create(restaurantId, createReviewInput, user);
  }

  @Query(() => [Review], { name: 'reviews' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Query(() => Review, { name: 'review' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.reviewsService.findOne(id);
  }

  @Mutation(() => Review, { name: 'updateReview' })
  update(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewsService.update(id, updateReviewInput);
  }

  @Mutation(() => Review, { name: 'removeReview' })
  remove(@Args('id', { type: () => ID }) id: string) {
    return this.reviewsService.remove(id);
  }
}
