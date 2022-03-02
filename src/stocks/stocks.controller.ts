import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
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
    const dataAll = await this.stocksService.findAll(
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
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }
}
