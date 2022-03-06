import {
  Product,
  ProductAdditional,
  ProductVariant,
} from 'src/products/entities/product.entity';
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
export class OrderProductVariant extends BaseSeloEntity {
  @Column()
  name: string;

  @ManyToOne(() => ProductVariant, (product) => product.orderProductVariant)
  productVariant: ProductVariant;
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

  @Column({ default: '' })
  image: string;

  @ManyToOne(() => Product, (product) => product.orderProduct)
  product: Product;

  @OneToOne(() => OrderProductVariant, (variant) => variant.productVariant)
  @JoinColumn()
  orderProductVariant: OrderProductVariant;

  @OneToMany(() => OrderProductAdditional, (addon) => addon.orderProduct)
  orderProductAdditionals: OrderProductAdditional[];
}

@Entity()
export class OrderProductAdditional extends BaseSeloEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => ProductAdditional, (pd) => pd.orderProductAdditional)
  productAdditional: ProductAdditional;

  @ManyToOne(
    () => OrderProduct,
    (orderProduct) => orderProduct.orderProductAdditionals,
  )
  orderProduct: OrderProduct;
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
