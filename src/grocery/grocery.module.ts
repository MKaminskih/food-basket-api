import { Module } from '@nestjs/common';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { FileService } from 'src/shared/storage/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { List } from './entity/list.entity';
import { ListProduct } from './entity/list-product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, List, ListProduct])],
    controllers: [GroceryController],
    providers: [GroceryService, FileService],
})
export class GroceryModule {}
