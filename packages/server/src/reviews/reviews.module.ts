import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';

@Module({
  providers: [ReviewsResolver, ReviewsService]
})
export class ReviewsModule {}
