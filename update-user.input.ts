import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  name?: string;

  @Field()
  email?: string;

  @Field()
  age?: number;
}
