import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseSeloEntity } from 'src/base.entity';

@Entity()
export class User extends BaseSeloEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  role: string;
}
