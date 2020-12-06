import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';
import { ReviewsService } from './reviews.service';

describe('RestaurantsResolver', () => {
  let resolver: RestaurantsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantsResolver, RestaurantsService, ReviewsService],
    }).compile();

    resolver = module.get<RestaurantsResolver>(RestaurantsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
