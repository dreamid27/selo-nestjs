import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.productRepository.save({
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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
    const res = await this.productRepository
      .createQueryBuilder('product')
      .skip(_start)
      .limit(_limit)
      .getMany();

    return res;
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const tempUser = await this.productRepository.findOne(+id);
    return this.productRepository.softDelete(tempUser);
  }
}
