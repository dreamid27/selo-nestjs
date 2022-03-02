import { Test, TestingModule } from '@nestjs/testing';
import { MutationsController } from './mutations.controller';
import { MutationsService } from './mutations.service';

describe('MutationsController', () => {
  let controller: MutationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MutationsController],
      providers: [MutationsService],
    }).compile();

    controller = module.get<MutationsController>(MutationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
