import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';

describe('ReviewsResolver', () => {
  let resolver: ReviewsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsResolver, ReviewsService],
    }).compile();

    resolver = module.get<ReviewsResolver>(ReviewsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
