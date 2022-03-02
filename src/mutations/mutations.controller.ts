import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MutationsService } from './mutations.service';
import { CreateMutationDto } from './dto/create-mutation.dto';
import { UpdateMutationDto } from './dto/update-mutation.dto';

@Controller('mutations')
export class MutationsController {
  constructor(private readonly mutationsService: MutationsService) {}

  @Post()
  create(@Body() createMutationDto: CreateMutationDto) {
    return this.mutationsService.create(createMutationDto);
  }

  @Get()
  findAll() {
    return this.mutationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mutationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMutationDto: UpdateMutationDto,
  ) {
    return this.mutationsService.update(+id, updateMutationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mutationsService.remove(+id);
  }
}
