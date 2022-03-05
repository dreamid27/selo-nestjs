import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import {
  Product,
  ProductAdditional,
  ProductVariant,
} from './products/entities/product.entity';
import {
  Order,
  OrderDetail,
  OrderProduct,
  OrderProductAdditional,
  OrderProductVariant,
} from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { StocksModule } from './stocks/stocks.module';
import { Stock } from './stocks/entities/stock.entity';
import { MutationsModule } from './mutations/mutations.module';
import { Mutation } from './mutations/entities/mutation.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/entities/tag.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'dbselo',
      entities: [
        User,
        Product,
        ProductVariant,
        ProductAdditional,
        Order,
        OrderDetail,
        OrderProduct,
        OrderProductVariant,
        OrderProductAdditional,
        Stock,
        Mutation,
        Tag,
      ],
      synchronize: true,
    }),
    ProductsModule,
    UsersModule,
    OrdersModule,
    StocksModule,
    MutationsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
