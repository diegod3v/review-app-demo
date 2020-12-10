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

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Mutation(() => Restaurant, { name: 'createRestaurant' })
  create(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ) {
    return this.restaurantsService.create(createRestaurantInput);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Query(() => Restaurant, { name: 'restaurant' })
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

  @Mutation(() => Restaurant, { name: 'updateRestaurant' })
  update(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
  ) {
    return this.restaurantsService.update(id, updateRestaurantInput);
  }

  @Mutation(() => Restaurant, { name: 'removeRestaurant' })
  remove(@Args('id', { type: () => ID }) id: string) {
    return this.restaurantsService.remove(id);
  }
}
