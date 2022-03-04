import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {
  Order,
  OrderDetail,
  OrderProduct,
  OrderProductVariant,
} from './entities/order.entity';
import { Product, ProductVariant } from 'src/products/entities/product.entity';
import { StocksModule } from 'src/stocks/stocks.module';
import { MutationsModule } from 'src/mutations/mutations.module';

@Module({
  imports: [
    StocksModule,
    OrdersModule,
    MutationsModule,
    TypeOrmModule.forFeature([
      Order,
      OrderDetail,
      OrderProduct,
      OrderProductVariant,
      Product,
      ProductVariant,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
