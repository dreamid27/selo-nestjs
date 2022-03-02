import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('_start') _start: number,
    @Query('_end') _end: number,
    @Query('_sort') _sort: string,
    @Query('_order') _order: string,
    @Query('q') q: string,
  ) {
    const dataAll = await this.ordersService.findAll(
      _start,
      _end,
      _sort,
      _order,
      q,
    );

    return res
      .setHeader('access-control-expose-headers', 'X-Total-Count')
      .setHeader('x-total-count', 0)
      .json(dataAll);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
