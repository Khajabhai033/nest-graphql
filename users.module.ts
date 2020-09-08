import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ItemsModule)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService, UsersResolver],
})
export class UsersModule {}
