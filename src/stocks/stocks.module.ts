import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { Stock } from './entities/stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductVariant } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Product, ProductVariant])],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {}
