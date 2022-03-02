import { Entity, Column, OneToMany } from 'typeorm';

import { BaseSeloEntity } from 'src/base.entity';
import { OrderProduct } from 'src/orders/entities/order.entity';

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
}
