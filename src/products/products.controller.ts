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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as test from 'read-excel-file/node';
import * as fs from 'fs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Res() res?: Response,
    @Query('_start') _start?: number,
    @Query('_end') _end?: number,
    @Query('_sort') _sort?: string,
    @Query('_order') _order?: string,
    @Query('q') q?: string,
  ) {
    const dataAll = await this.productsService.findAll(
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
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Post('excel')
  async UploadExcel(@Res() res: Response) {
    const templateExport = fs.createReadStream(
      './src/products/template/template_export.xlsx',
      'utf8',
    );

    const schema = {
      'Nama Produk': {
        prop: 'name',
        type: String,
      },
      Deskripsi: {
        prop: 'description',
        type: String,
      },
      'Harga Satuan': {
        prop: 'price',
        type: Number,
      },
      'Aktif (Y/T)': {
        prop: 'isActive',
        type: String,
      },
      'Nama Varian (Opsional)': {
        prop: 'variantName',
        type: String,
      },
      'Harga Variant (Opsional)': {
        prop: 'variantPrice',
        type: Number,
      },
    };

    const productRows = await test.default(
      fs.createReadStream('./src/products/template/template_export.xlsx'),
      { schema },
    );

    //TODO: Moving to service and add mapping

    res.json(productRows);
  }
}
