import { BaseSeloEntity } from 'src/base.entity';
import { Product, ProductVariant } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Stock extends BaseSeloEntity {
  @Column()
  amount: number;

  @Column()
  warehouse: string;

  @ManyToOne(() => Product, (product) => product.stock)
  product: Product;

  @ManyToOne(() => ProductVariant, (product) => product.stock)
  productVariant: ProductVariant;
}
