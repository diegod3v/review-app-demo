import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Review } from './entities/review.entity';
import { Tag } from './entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Review, Tag])],
  providers: [
    RestaurantsResolver,
    RestaurantsService,
    ReviewsResolver,
    ReviewsService,
  ],
})
export class RestaurantsModule {}
