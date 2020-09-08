import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserInput } from './create-user.input';
import { UserDto } from './users.dto';
import { UpdateUserInput } from './update-user.input';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async findAll(): Promise<UserDto[]> {
    return await this.usersRepo.find();
  }

  async findOne(id: number): Promise<UserDto> {
    return await this.findUser(id);
  }

  async create(user: CreateUserInput): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, user);
    return await this.usersRepo.save(newUser);
  }

  async update(id: number, user: UpdateUserInput): Promise<UserDto> {
    const newUser = await this.findUser(id);

    Object.assign(newUser, user);

    await this.usersRepo.update(id, newUser);

    return newUser;
  }

  async delete(id: number): Promise<UserDto> {
    const user = await this.findUser(id);
    await this.usersRepo.delete(id);
    return user;
  }

  private async findUser(id: number): Promise<User> {
    const user = this.usersRepo.findOne(id);
    if (!user) throw new NotFoundException('Invalid User Id');
    return user;
  }
}
