import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { Review } from './models/review.model';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-gql.guard';
import { RequirePermissions } from 'src/casl/casl.decorator';
import { Action } from 'src/casl/action.enum';
import { Resource } from 'src/casl/resources.enum';
import { Public } from 'src/auth/is-public.decorator';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review, { name: 'createReview' })
  @RequirePermissions(Action.Create, Resource.Review)
  create(
    @Args('restaurantId', { type: () => ID }) restaurantId: string,
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @CurrentUser() user: User,
  ) {
    return this.reviewsService.create(restaurantId, createReviewInput, user);
  }

  @Query(() => [Review], { name: 'reviews' })
  @Public()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Query(() => Review, { name: 'review' })
  @Public()
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.reviewsService.findOne(id);
  }

  @Mutation(() => Review, { name: 'updateReview' })
  @RequirePermissions(Action.Update, Resource.Review)
  update(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.reviewsService.update(id, updateReviewInput);
  }

  @Mutation(() => Review, { name: 'removeReview' })
  @RequirePermissions(Action.Delete, Resource.Review)
  remove(@Args('id', { type: () => ID }) id: string) {
    return this.reviewsService.remove(id);
  }
}
