import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { Tag } from './entities/tags.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(
    createRestaurantInput: CreateRestaurantInput,
    tagsIds?: string[],
  ) {
    const tags = tagsIds ? await this.tagRepository.findByIds(tagsIds) : [];

    const restaurant = new Restaurant();
    restaurant.name = createRestaurantInput.name;
    restaurant.description = createRestaurantInput.description;
    restaurant.phone = createRestaurantInput.phone;
    restaurant.website = createRestaurantInput.website;
    restaurant.kitchen = createRestaurantInput.kitchen;
    restaurant.tags = tags;

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

  async createTag(tagLabel: string) {
    const tag = new Tag();
    tag.label = tagLabel;

    const createdTag = await this.tagRepository.save(tag);
    return createdTag.label;
  }

  removeTag(id: string) {
    this.tagRepository.delete(id);
  }
}
