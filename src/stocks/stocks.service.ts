import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductVariant } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stockRepo: Repository<Stock>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(ProductVariant)
    private productVariantRepo: Repository<ProductVariant>,
  ) {}

  async create(createStockDto: CreateStockDto) {
    const product = await this.productRepo.findOne(createStockDto.productId);

    const stock = new Stock();
    stock.product = product;
    stock.amount = createStockDto.amount;
    stock.warehouse = createStockDto.warehouse;
    stock.createdAt = new Date();
    stock.updatedAt = new Date();

    // Check apakah variant is exists
    if (createStockDto.productVariantId) {
      const productVariant = await this.productVariantRepo.findOne({
        product: product,
        id: createStockDto.productVariantId,
      });

      // TODO : Find best practice for handle bad request error
      if (!productVariant) throw new Error("Variant doesn't exists");

      stock.productVariant = productVariant;
    }

    return this.stockRepo.save(stock);
  }

  async findAll(
    _start: number,
    _end: number,
    _sort: string,
    _order: string,
    q: string,
  ): Promise<Stock[]> {
    let _limit = _end - _start || 0;
    if (_limit <= 0) _limit = 10;

    // TODO : Implement q, _order, _sort
    const res = await this.stockRepo
      .createQueryBuilder('stock')
      .skip(_start)
      .limit(_limit)
      .getMany();

    return res;
  }

  findOne(id: number) {
    return this.stockRepo.findOne(id);
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  async remove(id: number) {
    const tempUser = await this.stockRepo.findOne(+id);
    return this.stockRepo.softDelete(tempUser);
  }

  async updateStock(product: Product, amount: number) {
    let stockProduct = await this.stockRepo.findOne({
      product: product,
      warehouse: 'UTAMA', //TODO change to dynamic
    });

    if (!stockProduct) return null;
    stockProduct = { ...stockProduct, amount: stockProduct.amount - amount };
    stockProduct.updatedAt = new Date();

    return this.stockRepo.save(stockProduct);
  }
}
