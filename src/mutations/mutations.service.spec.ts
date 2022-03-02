import { Test, TestingModule } from '@nestjs/testing';
import { MutationsService } from './mutations.service';

describe('MutationsService', () => {
  let service: MutationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutationsService],
    }).compile();

    service = module.get<MutationsService>(MutationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
