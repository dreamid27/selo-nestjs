import { Column, ManyToOne, Entity } from 'typeorm';
import { BaseSeloEntity } from 'src/base.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Mutation extends BaseSeloEntity {
  @Column()
  type: string;

  @Column()
  amount: number;

  @Column()
  start: number;

  @Column()
  end: number;

  @ManyToOne(() => Product, (product) => product.stock)
  product: Product;
}
