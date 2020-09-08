import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';
import { CreateUserInput } from './create-user.input';
import { ItemsService } from '../items/items.service';
import { CreateItemdto } from '../items/create-item.dto';
import { UpdateUserInput } from '../users/update-user.input';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(
    private userService: UsersService,
    private itemService: ItemsService,
  ) {}

  @Query(() => [UserDto])
  async users(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Query(() => UserDto)
  async user(@Args('id') id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @ResolveField('items', returns => [CreateItemdto])
  async items(@Parent() user: UserDto): Promise<CreateItemdto[]> {
    const { id } = user;
    return this.itemService.findByUserId({ user: id });
  }

  @Mutation(() => UserDto)
  async createUser(@Args('user') user: CreateUserInput): Promise<UserDto> {
    return this.userService.create(user);
  }

  @Mutation(type => UserDto)
  async updateUser(
    @Args('id') id: number,
    @Args('user') user: UpdateUserInput,
  ) {
    return this.userService.update(id, user);
  }

  @Mutation(type => UserDto)
  async deleteUser(@Args('id') id: number): Promise<UserDto> {
    return this.userService.delete(id);
  }
}
