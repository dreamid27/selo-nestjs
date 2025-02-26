import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

import { BaseSeloEntity } from 'src/base.entity';
import {
  OrderProduct,
  OrderProductAdditional,
  OrderProductVariant,
} from 'src/orders/entities/order.entity';
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

  @Column({ default: '' })
  image: string;
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

  @OneToMany(() => Stock, (details) => details.productVariant)
  stock: Stock[];

  @OneToMany(() => OrderProductVariant, (details) => details.productVariant)
  orderProductVariant: OrderProductVariant[];
}

@Entity()
export class ProductAdditional extends BaseSeloEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.additional)
  product: Product;

  @OneToMany(() => OrderProductAdditional, (addon) => addon.productAdditional)
  orderProductAdditional: OrderProductAdditional[];
}
