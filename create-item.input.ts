import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field()
  description: string;

  @Field(() => Int)
  userId: number;
}
