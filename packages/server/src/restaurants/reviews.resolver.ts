import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Public } from 'src/auth/is-public.decorator';
import { Action } from 'src/casl/action.enum';
import { RequirePermissions } from 'src/casl/casl.decorator';
import { Resource } from 'src/casl/resources.enum';
import { User } from 'src/users/entities/user.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { Review } from './models/review.model';
import { ReviewsService } from './reviews.service';

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
