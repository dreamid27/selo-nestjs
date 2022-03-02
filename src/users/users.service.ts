import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save({
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async countAll(): Promise<number> {
    const res = await this.usersRepository.manager.query(
      `SELECT COUNT(*) FROM public.user`,
    );
    return res[0].count;
  }

  async findAll(
    _start: number,
    _end: number,
    _sort: string,
    _order: string,
    q: string,
  ): Promise<User[]> {
    let _limit = _end - _start || 0;
    if (_limit < 0) _limit = 0;

    const prepQuery = `SELECT * FROM public.user WHERE "deletedAt" IS NULL 
      ${
        q ? `AND "firstName" ILIKE '%${q}%' OR "lastName" ILIKE '%${q}%'` : ''
      } ${
      _sort ? `ORDER BY "${_sort}" ${_order}` : ''
    } LIMIT ${_limit} OFFSET ${_start} `;

    const res = await this.usersRepository.manager.query(prepQuery);

    return res;
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.usersRepository.findOne(+id);

    //add validation is exist
    if (!user) return null;

    user = { ...user, ...updateUserDto };
    user.updatedAt = new Date();
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const tempUser = await this.usersRepository.findOne(+id);

    return this.usersRepository.softDelete(tempUser);
  }
}
