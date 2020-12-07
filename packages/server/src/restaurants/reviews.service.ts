import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { Restaurant } from './entities/restaurant.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(restaurantId: string, createReviewInput: CreateReviewInput) {
    const restaurant = await this.restaurantRepository.findOne(restaurantId);

    const review = new Review();
    review.comment = createReviewInput.comment;
    review.date = createReviewInput.date;
    review.rate = createReviewInput.rate;
    review.restaurant = restaurant;

    return this.reviewRepository.save(review);
  }

  findAll() {
    return this.reviewRepository.find();
  }

  findAllByRestaurantId(restaurantId: string) {
    return this.reviewRepository.find({ where: { restaurant: restaurantId } });
  }

  async findAllByRestaurantIdAndCount(restaurantId: string) {
    const [, reviewsCount] = await this.reviewRepository.findAndCount({
      where: { restaurant: restaurantId },
    });

    return reviewsCount;
  }

  async getRateAverageByRestaurantId(restaurantId: string) {
    const { avg } = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoin(
        'review.restaurant',
        'restaurant',
        'review.restaurant = :restaurantId',
        { restaurantId },
      )
      .select('AVG(review.rate)', 'avg')
      .getRawOne();

    return avg ? Number(avg).toFixed(1) : 0;
  }

  findOne(id: string) {
    return this.reviewRepository.findOne(id);
  }

  update(id: string, updateReviewInput: UpdateReviewInput) {
    const review = new Review();
    review.comment = updateReviewInput.comment;
    review.date = updateReviewInput.date;
    review.rate = updateReviewInput.rate;

    return this.reviewRepository.update({ id }, review);
  }

  remove(id: string) {
    return this.reviewRepository.delete(id);
  }
}
