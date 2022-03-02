import { PartialType } from '@nestjs/swagger';
import { CreateMutationDto } from './create-mutation.dto';

export class UpdateMutationDto extends PartialType(CreateMutationDto) {}
