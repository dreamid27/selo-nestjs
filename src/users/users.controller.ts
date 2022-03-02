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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
    const dataAll = await this.usersService.findAll(
      _start,
      _end,
      _sort,
      _order,
      q,
    );
    console.log(dataAll, 'data all');

    const dataCount = await this.usersService.countAll();

    return res
      .setHeader('access-control-expose-headers', 'X-Total-Count')
      .setHeader('x-total-count', dataCount)
      .json(dataAll);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log('update' + id);
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('deleted' + id);
    return this.usersService.remove(+id);
  }
}
