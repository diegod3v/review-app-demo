import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { ReviewsService } from './reviews.service';

@Resolver('Restaurant')
export class RestaurantsResolver {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Mutation('createRestaurant')
  create(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
    @Args('tagsIds')
    tagsIds?: string[],
  ) {
    return this.restaurantsService.create(createRestaurantInput, tagsIds);
  }

  @Query('restaurants')
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Query('restaurant')
  findOne(@Args('id') id: string) {
    return this.restaurantsService.findOne(id);
  }

  @ResolveField('reviews')
  async getReviews(@Parent() restaurant) {
    const { id } = restaurant;
    return this.reviewsService.findAllByRestaurantId(id);
  }

  @ResolveField('reviewsCount')
  async getReviewsCount(@Parent() restaurant) {
    const { id } = restaurant;
    return this.reviewsService.findAllByRestaurantIdAndCount(id);
  }

  @ResolveField('rateAverage')
  async getRateAverage(@Parent() restaurant) {
    const { id } = restaurant;
    return this.reviewsService.getRateAverageByRestaurantId(id);
  }

  @Mutation('updateRestaurant')
  update(
    @Args('id') id: string,
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
  ) {
    return this.restaurantsService.update(id, updateRestaurantInput);
  }

  @Mutation('removeRestaurant')
  remove(@Args('id') id: string) {
    return this.restaurantsService.remove(id);
  }

  @Mutation('createTag')
  createTag(@Args('createTagInput') createTagInput: string) {
    return this.restaurantsService.createTag(createTagInput);
  }

  @Mutation('removeTag')
  removeTag(@Args('id') id: string) {
    return this.restaurantsService.removeTag(id);
  }
}
