import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

import { BaseSeloEntity } from 'src/base.entity';
import { OrderProduct } from 'src/orders/entities/order.entity';
import { Stock } from 'src/stocks/entities/stock.entity';

/* Why we created like this ? the model will reuse in another module */
/* Important : Please update `orderProduct` when you update this model */
@Entity()
export class BaseProduct extends BaseSeloEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isActive: boolean;
}

@Entity()
export class Product extends BaseProduct {
  @OneToMany(() => OrderProduct, (details) => details.product)
  orderProduct: OrderProduct[];

  @OneToMany(() => ProductVariant, (details) => details.product)
  variants: ProductVariant[];

  @OneToMany(() => ProductAdditional, (details) => details.product)
  additional: ProductAdditional[];

  @OneToMany(() => Stock, (details) => details.product)
  stock: Stock[];
}

@Entity()
export class ProductVariant extends BaseSeloEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;
}

@Entity()
export class ProductAdditional extends BaseSeloEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.additional)
  product: Product;
}
