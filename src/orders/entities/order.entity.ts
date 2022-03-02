import { BaseProduct, Product } from 'src/products/entities/product.entity';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseSeloEntity } from 'src/base.entity';

@Entity()
export class Order extends BaseSeloEntity {
  @Column()
  date: Date;
  @Column()
  status: string;
  @Column()
  code: string;
  @Column()
  total: number;
  @Column()
  discount: number;
  @Column()
  tableCode: string;

  @OneToMany(() => OrderDetail, (details) => details.order)
  details: OrderDetail[];
}

@Entity()
export class OrderProduct extends BaseSeloEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isActive: boolean;

  @ManyToOne(() => Product, (product) => product.orderProduct)
  product: Product;
}

@Entity()
export class OrderDetail extends BaseSeloEntity {
  @ManyToOne(() => Order, (order) => order.details)
  order: Order;

  @Column()
  subTotal: number;

  @OneToOne(() => OrderProduct)
  @JoinColumn()
  orderProduct: OrderProduct;
}
