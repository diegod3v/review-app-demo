import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';

@Module({
  providers: [
    RestaurantsResolver,
    RestaurantsService,
    ReviewsResolver,
    ReviewsService,
  ],
})
export class RestaurantsModule {}
