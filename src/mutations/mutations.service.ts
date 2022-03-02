import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateMutationDto } from './dto/create-mutation.dto';
import { UpdateMutationDto } from './dto/update-mutation.dto';
import { Mutation } from './entities/mutation.entity';

@Injectable()
export class MutationsService {
  constructor(
    @InjectRepository(Mutation)
    private mutationRepo: Repository<Mutation>,
  ) {}

  create(createMutationDto: CreateMutationDto) {
    return 'This action adds a new mutation';
  }

  findAll() {
    return `This action returns all mutations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mutation`;
  }

  update(id: number, updateMutationDto: UpdateMutationDto) {
    return `This action updates a #${id} mutation`;
  }

  remove(id: number) {
    return `This action removes a #${id} mutation`;
  }

  async updateMutation(
    type: string,
    amount: number,
    start: number,
    product: Product,
  ) {
    const mutation = new Mutation();
    mutation.product = product;
    mutation.amount = amount;
    mutation.type = type;
    mutation.start = start;
    mutation.end = start - amount;

    return this.mutationRepo.save(mutation);
  }
}
