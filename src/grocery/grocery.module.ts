import { Module } from '@nestjs/common';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { List } from './entity/list.entity';
import { ListProduct } from './entity/list-product.entity';
import { FoodBasketService } from 'src/shared/storage/db/food.basket.service';
import { EntityCreateService } from 'src/shared/storage/db/entity.create.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, List, ListProduct])],
    controllers: [GroceryController],
    providers: [GroceryService, EntityCreateService, FoodBasketService],
})
export class GroceryModule {}
