import { BaseSeloEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Tag extends BaseSeloEntity {
  @Column()
  name: string;

  @Column()
  type: string;
}
