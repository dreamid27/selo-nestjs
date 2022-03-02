import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderDetail, OrderProduct } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepo: Repository<OrderDetail>,

    @InjectRepository(OrderProduct)
    private orderProductRepo: Repository<OrderProduct>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
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
    const newOrder = await this.orderRepo.save(order);

    // Create Order Details
    for (const key in createOrderDto.details) {
      const detail = createOrderDto.details[key];

      // Find Product Id
      const product = await this.productRepo.findOne(detail.productId);

      // Create Order product
      const tempOrderProduct = new OrderProduct();
      tempOrderProduct.description = product.description;
      tempOrderProduct.isActive = product.isActive;
      tempOrderProduct.name = product.name;
      tempOrderProduct.price = product.price;
      tempOrderProduct.product = product;
      tempOrderProduct.createdAt = new Date();
      tempOrderProduct.updatedAt = new Date();

      const orderProduct = await this.orderProductRepo.save(tempOrderProduct);

      // Calculate Subtotal
      const finalSubtotal = orderProduct.price;

      // TODO - Calculate Discount - Insert Logic Discount/Promo Here

      // Create Order Detail
      await this.orderDetailRepo.save({
        ...{
          subTotal: finalSubtotal,
        },
        order: newOrder,
        orderProduct: orderProduct,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      totalAmountOrder += finalSubtotal;
    }

    newOrder.total = totalAmountOrder;
    const finalOrder = this.orderRepo.save(newOrder);

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
