import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Order,
  OrderDetail,
  OrderProduct,
  OrderProductAdditional,
  OrderProductVariant,
} from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  Product,
  ProductAdditional,
  ProductVariant,
} from 'src/products/entities/product.entity';
import { StocksService } from 'src/stocks/stocks.service';
import { MutationsService } from 'src/mutations/mutations.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepo: Repository<OrderDetail>,

    @InjectRepository(OrderProduct)
    private orderProductRepo: Repository<OrderProduct>,

    @InjectRepository(OrderProductVariant)
    private orderProductVariantRepo: Repository<OrderProductVariant>,

    @InjectRepository(OrderProductAdditional)
    private orderProductAddonRepo: Repository<OrderProductAdditional>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(ProductVariant)
    private productVariantRepo: Repository<ProductVariant>,

    @InjectRepository(ProductAdditional)
    private productAdditionRepo: Repository<ProductAdditional>,

    private stockService: StocksService,

    private mutationService: MutationsService,
  ) {}

  async getEntityCode(type: string): Promise<string> {
    switch (type) {
      default:
        const countNum = await this.orderRepo.count();
        return `XXX${countNum}`;
    }
  }

  async create(createOrderDto: CreateOrderDto) {
    // Create Order
    const order = new Order();
    order.code = createOrderDto.code;
    order.date = createOrderDto.date;
    order.tableCode = createOrderDto.tableCode;
    order.discount = 0;
    order.status = 'DONE';
    order.createdAt = new Date();
    order.updatedAt = new Date();
    order.total = createOrderDto.total;

    // Generate Code
    const tempCode = await this.getEntityCode('ORDER');

    order.code = tempCode;

    // TODO : Setup Status
    // TODO : Create Order Code Automatic

    let totalAmountOrder = 0;
    await this.orderRepo.save(order);

    // Create Order Details
    for (const key in createOrderDto.details) {
      const detail = createOrderDto.details[key];

      // Find Product Id
      const product = await this.productRepo.findOne(detail.productId);

      // Find Product Variant Id
      // TODO : Find best practice for handle if variant not exists for the product
      const variant = await this.productVariantRepo.findOne(detail.variantId);

      // Create Order Product Variant
      const tempOrderProductVariant = new OrderProductVariant();
      tempOrderProductVariant.name = variant.name;
      tempOrderProductVariant.productVariant = variant;
      tempOrderProductVariant.createdAt = new Date();
      tempOrderProductVariant.updatedAt = new Date();
      await this.orderProductVariantRepo.save(tempOrderProductVariant);

      // Create Order product
      const tempOrderProduct = new OrderProduct();
      tempOrderProduct.description = product.description;
      tempOrderProduct.isActive = product.isActive;
      tempOrderProduct.name = product.name;
      tempOrderProduct.price = variant.price || product.price;
      tempOrderProduct.product = product;
      tempOrderProduct.createdAt = new Date();
      tempOrderProduct.updatedAt = new Date();
      tempOrderProduct.orderProductVariant = tempOrderProductVariant;

      await this.orderProductRepo.save(tempOrderProduct);

      // Calculate Subtotal
      const finalSubtotal = tempOrderProduct.price;

      // TODO - Calculate Discount - Insert Logic Discount/Promo Here

      // Create Order Detail
      await this.orderDetailRepo.save({
        ...{
          subTotal: finalSubtotal,
        },
        order: order,
        orderProduct: tempOrderProduct,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      totalAmountOrder += finalSubtotal;
      const amountItem = 1;

      let totalPriceAddons = 0;

      // Create Order Addon
      for (const key in detail.addonIds) {
        const addonId = detail.addonIds[key];

        const addon = await this.productAdditionRepo.findOne(addonId);

        const tempOrderProductAddon = new OrderProductAdditional();
        tempOrderProductAddon.name = addon.name;
        tempOrderProductAddon.price = addon.price;
        tempOrderProductAddon.orderProduct = tempOrderProduct;
        tempOrderProductAddon.productAdditional = addon;
        tempOrderProductAddon.createdAt = new Date();
        tempOrderProductAddon.updatedAt = new Date();
        await this.orderProductAddonRepo.save(tempOrderProductAddon);

        totalPriceAddons += addon.price;
        //TODO calculate total amount order detail
      }

      // Update Total Price + Addons
      tempOrderProduct.price += totalPriceAddons;

      // Update Details
      await this.orderProductRepo.save(tempOrderProduct);

      // Update Stock
      await this.stockService.updateStock(product, amountItem);

      // Update Mutation
      await this.mutationService.updateMutation(
        'PENJUALAN',
        amountItem,
        10, //TODO change this with stock awal
        product,
      );
    }

    order.total = totalAmountOrder;
    const finalOrder = this.orderRepo.save(order);

    return finalOrder;
  }

  async findAll(
    _start: number,
    _end: number,
    _sort: string,
    _order: string,
    q: string,
  ): Promise<Order[]> {
    let _limit = _end - _start || 0;
    if (_limit <= 0) _limit = 10;

    // TODO : Implement q, _order, _sort
    const res = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.details', 'orderDetails')
      .leftJoinAndSelect('orderDetails.orderProduct', 'orderProduct')
      .leftJoinAndSelect(
        'orderProduct.orderProductVariant',
        'orderProductVariant',
      )
      .leftJoinAndSelect(
        'orderProduct.orderProductAdditionals',
        'orderProductAdditionals',
      )
      .skip(_start)
      .limit(_limit)
      .getMany();

    return res;
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepo.findOne(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    const tempUser = await this.orderRepo.findOne(+id);

    return this.orderRepo.softDelete(tempUser);
  }
}
