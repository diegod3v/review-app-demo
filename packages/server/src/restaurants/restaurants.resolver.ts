import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

@Resolver('Restaurant')
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Mutation('createRestaurant')
  create(@Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput) {
    return this.restaurantsService.create(createRestaurantInput);
  }

  @Query('restaurants')
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Query('restaurant')
  findOne(@Args('id') id: number) {
    return this.restaurantsService.findOne(id);
  }

  @Mutation('updateRestaurant')
  update(@Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput) {
    return this.restaurantsService.update(updateRestaurantInput.id, updateRestaurantInput);
  }

  @Mutation('removeRestaurant')
  remove(@Args('id') id: number) {
    return this.restaurantsService.remove(id);
  }
}
