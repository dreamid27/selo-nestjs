import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderDetail, OrderProduct } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, OrderProduct, Product]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, AppService],
})
export class OrdersModule {}
