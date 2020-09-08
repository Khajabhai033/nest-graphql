import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { CreateItemdto } from './create-item.dto';
import { CreateItemInput } from './create-item.input';
import { UserDto } from '../users/users.dto';
import { UsersService } from 'src/users/users.service';

@Resolver(() => CreateItemdto)
export class ItemsResolver {
  constructor(
    private itemService: ItemsService,
    private userService: UsersService,
  ) {}

  @Query(() => [CreateItemdto])
  async items(): Promise<CreateItemdto[]> {
    return this.itemService.findAll();
  }

  @Query(() => CreateItemdto)
  async item(@Args('id') id: number): Promise<CreateItemdto> {
    return this.itemService.findOne(id);
  }

  @ResolveField('user', returns => UserDto)
  async user(@Parent() item: CreateItemInput): Promise<UserDto> {
    const { userId } = item;
    return this.userService.findOne(userId);
  }

  @Mutation(() => CreateItemdto)
  async createItem(
    @Args('item') item: CreateItemInput,
  ): Promise<CreateItemdto> {
    return this.itemService.create(item);
  }

  @Mutation(() => CreateItemdto)
  async updateItem(
    @Args('id') id: number,
    @Args('item') item: CreateItemInput,
  ): Promise<CreateItemdto> {
    return this.itemService.update(id, item);
  }

  @Mutation(() => CreateItemdto)
  async deleteItem(@Args('id') id: number): Promise<CreateItemdto> {
    return this.itemService.delete(id);
  }
}
