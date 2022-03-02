import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  Product,
  ProductAdditional,
  ProductVariant,
} from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(ProductVariant)
    private productVariantRepo: Repository<ProductVariant>,

    @InjectRepository(ProductAdditional)
    private ProductAdditionalRepo: Repository<ProductAdditional>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.createdAt = new Date();
    product.updatedAt = new Date();

    const newProduct = await this.productRepo.save({
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create Variants
    for (const key in createProductDto.variants) {
      const detail = createProductDto.variants[key];

      const variant = new ProductVariant();
      variant.price = detail.price;
      variant.name = detail.name;
      variant.product = newProduct;

      await this.productVariantRepo.save(variant);
    }

    // Create Additional
    for (const key in createProductDto.additionals) {
      const detail = createProductDto.additionals[key];

      const additional = new ProductAdditional();
      additional.price = detail.price;
      additional.name = detail.name;
      additional.product = newProduct;

      await this.ProductAdditionalRepo.save(additional);
    }

    return newProduct;
  }

  async findAll(
    _start: number,
    _end: number,
    _sort: string,
    _order: string,
    q: string,
  ): Promise<Product[]> {
    let _limit = _end - _start || 0;
    if (_limit <= 0) _limit = 10;

    // TODO : Implement q, _order, _sort
    const res = await this.productRepo
      .createQueryBuilder('product')
      .skip(_start)
      .limit(_limit)
      .getMany();

    return res;
  }

  findOne(id: number): Promise<Product> {
    return this.productRepo.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const tempUser = await this.productRepo.findOne(+id);
    return this.productRepo.softDelete(tempUser);
  }
}
