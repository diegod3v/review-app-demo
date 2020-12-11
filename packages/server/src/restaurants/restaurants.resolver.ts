import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
  Float,
  ID,
} from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { ReviewsService } from './reviews.service';
import { Restaurant } from './models/restaurant.model';
import { Review } from './models/review.model';
import { RequirePermissions } from 'src/casl/casl.decorator';
import { Action } from 'src/casl/action.enum';
import { Resource } from 'src/casl/resources.enum';
import { Public } from 'src/auth/is-public.decorator';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Mutation(() => Restaurant, { name: 'createRestaurant' })
  @RequirePermissions(Action.Create, Resource.Restaurant)
  create(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ) {
    return this.restaurantsService.create(createRestaurantInput);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  @Public()
  findAll() {
    return this.restaurantsService.findAllAndOrderByReviewRate();
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  @Public()
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.restaurantsService.findOne(id);
  }

  @ResolveField('reviews', () => [Review])
  async getReviews(@Parent() restaurant) {
    const { id } = restaurant;
    return this.reviewsService.findAllByRestaurantId(id);
  }

  @ResolveField('reviewsCount', () => Int)
  async getReviewsCount(@Parent() restaurant) {
    const { id } = restaurant;
    return this.reviewsService.findAllByRestaurantIdAndCount(id);
  }

  @ResolveField('rateAverage', () => Float)
  async getRateAverage(@Parent() restaurant) {
    const { id } = restaurant;
    return this.reviewsService.getRateAverageByRestaurantId(id);
  }

  @ResolveField('latestReview', () => Review)
  async getLatestReview(@Parent() restaurant) {
    const { id } = restaurant;
    return this.reviewsService.findFirstResultByFieldAndRestaurantId(
      'date',
      id,
      'DESC',
    );
  }

  @ResolveField('lowestReview', () => Review)
  async getLowestReview(@Parent() restaurant) {
    const { id } = restaurant;
    return this.reviewsService.findFirstResultByFieldAndRestaurantId(
      'rate',
      id,
      'ASC',
    );
  }

  @ResolveField('highestReview', () => Review)
  async getHighestReview(@Parent() restaurant) {
    const { id } = restaurant;
    return this.reviewsService.findFirstResultByFieldAndRestaurantId(
      'rate',
      id,
      'DESC',
    );
  }

  @Mutation(() => Restaurant, { name: 'updateRestaurant' })
  @RequirePermissions(Action.Update, Resource.Restaurant)
  update(
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.restaurantsService.update(id, updateRestaurantInput);
  }

  @Mutation(() => Restaurant, { name: 'removeRestaurant' })
  @RequirePermissions(Action.Delete, Resource.Restaurant)
  remove(@Args('id', { type: () => ID }) id: string) {
    return this.restaurantsService.remove(id);
  }
}
