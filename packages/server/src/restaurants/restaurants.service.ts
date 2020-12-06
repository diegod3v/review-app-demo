import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  create(createRestaurantInput: CreateRestaurantInput) {
    const restaurant = new Restaurant();
    restaurant.name = createRestaurantInput.name;

    return this.restaurantRepository.save(restaurant);
  }

  findAll() {
    return this.restaurantRepository.find();
  }

  findOne(id: string) {
    return this.restaurantRepository.findOne(id);
  }

  update(id: string, updateRestaurantInput: UpdateRestaurantInput) {
    const restaurant = new Restaurant();
    restaurant.name = updateRestaurantInput.name;

    return this.restaurantRepository.update({ id }, restaurant);
  }

  remove(id: string) {
    return this.restaurantRepository.delete(id);
  }
}
