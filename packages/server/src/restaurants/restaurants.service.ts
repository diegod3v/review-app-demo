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

  async create(createRestaurantInput: CreateRestaurantInput) {
    const restaurant = new Restaurant();
    restaurant.name = createRestaurantInput.name;
    restaurant.description = createRestaurantInput.description;
    restaurant.phone = createRestaurantInput.phone;
    restaurant.website = createRestaurantInput.website;
    restaurant.thumbnail = createRestaurantInput.thumbnail;

    return this.restaurantRepository.save(restaurant);
  }

  findAll() {
    return this.restaurantRepository.find();
  }

  findAllAndOrderByReviewRate() {
    return this.restaurantRepository
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.reviews', 'review')
      .orderBy('review.rate', 'ASC')
      .getMany();
  }

  findOne(id: string) {
    return this.restaurantRepository.findOne(id);
  }

  async update(id: string, updateRestaurantInput: UpdateRestaurantInput) {
    const restaurant = new Restaurant();
    restaurant.name = updateRestaurantInput.name;
    restaurant.description = updateRestaurantInput.description;
    restaurant.phone = updateRestaurantInput.phone;
    restaurant.website = updateRestaurantInput.website;
    restaurant.thumbnail = updateRestaurantInput.thumbnail;

    await this.restaurantRepository.update({ id }, restaurant);

    return this.restaurantRepository.findOne(id);
  }

  remove(id: string) {
    return this.restaurantRepository.delete(id);
  }
}
