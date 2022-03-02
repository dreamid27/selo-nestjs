import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { BaseProduct, Product } from './entities/product.entity';
import { OrderProduct } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, OrderProduct])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
