import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './items.entity';
import { CreateItemInput } from './create-item.input';
import { CreateItemdto } from './create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private itemRepo: Repository<Item>) {}

  async findAll(): Promise<CreateItemdto[]> {
    return await this.itemRepo.find();
  }

  async findByUserId(filter): Promise<CreateItemdto[]> {
    return await this.itemRepo.find(filter);
  }

  async findOne(id: number): Promise<CreateItemdto> {
    return await this.findItem(id);
  }

  async create(item: CreateItemInput): Promise<CreateItemdto> {
    const newItem = new Item();
    Object.assign(newItem, item);
    return await this.itemRepo.save(newItem);
  }

  async update(id: number, item: CreateItemInput): Promise<CreateItemdto> {
    //await this.itemRepo.update(id, item);// returns UpdateResult
    const itemU = await this.findItem(id);
    Object.assign(itemU, item);
    this.itemRepo.save(itemU);
    return itemU;
  }

  async delete(id: number): Promise<CreateItemdto> {
    const itemU = await this.findItem(id);
    await this.itemRepo.delete(itemU.id);
    return itemU;
  }

  private async findItem(id: number): Promise<Item> {
    const item = await this.itemRepo.findOne(id);

    if (!item) throw new NotFoundException('Invalid Item ID');

    return item;
  }
}
