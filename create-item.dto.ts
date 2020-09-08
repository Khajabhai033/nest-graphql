import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { UserDto } from '../users/users.dto';

@ObjectType()
export class CreateItemdto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field()
  description: string;

  @Field(() => UserDto, { nullable: true })
  user: UserDto;
}
