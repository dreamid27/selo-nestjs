import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderDetail, OrderProduct } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { StocksModule } from 'src/stocks/stocks.module';
import { MutationsModule } from 'src/mutations/mutations.module';

@Module({
  imports: [
    StocksModule,
    OrdersModule,
    MutationsModule,
    TypeOrmModule.forFeature([Order, OrderDetail, OrderProduct, Product]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
