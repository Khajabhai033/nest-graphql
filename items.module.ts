import { Module, forwardRef } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), forwardRef(() => UsersModule)],
  providers: [ItemsService, ItemsResolver],
  exports: [ItemsService, ItemsResolver],
})
export class ItemsModule {}
