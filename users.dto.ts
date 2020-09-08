import { ObjectType, Field } from '@nestjs/graphql';
import { CreateItemdto } from '../items/create-item.dto';

@ObjectType()
export class UserDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;

  @Field(type => [CreateItemdto])
  items: CreateItemdto[];
}
