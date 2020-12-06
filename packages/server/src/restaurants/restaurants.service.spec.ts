import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repository: Repository<Restaurant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        { provide: getRepositoryToken(Restaurant), useClass: Repository },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repository = module.get<Repository<Restaurant>>(
      getRepositoryToken(Restaurant),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return restaurant array', async () => {
      const result: Restaurant[] = [{ id: '1', name: 'Pizza 1' }];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });
});
