import { Module } from '@nestjs/common';
import { MutationsService } from './mutations.service';
import { MutationsController } from './mutations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mutation } from './entities/mutation.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mutation, Product])],
  controllers: [MutationsController],
  providers: [MutationsService],
  exports: [MutationsService],
})
export class MutationsModule {}
