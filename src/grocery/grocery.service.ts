import { Injectable } from '@nestjs/common';
import { toDate } from 'src/shared/utils/DateUtils';
import { ListDto } from './dto/ListDto';
import { GroceryMapper } from './mapper/GroceryMapper';
import { ProductDto } from './dto/ProductDto';
import { FoodBasketService } from 'src/shared/storage/db/food.basket.service';
import { listProductToString } from 'src/shared/constants';

@Injectable()
export class GroceryService {
    constructor(private readonly foodBasketService: FoodBasketService) {}

    async getList(date: string): Promise<ListDto | null> {
        const validDate = toDate(date);
        const list = await this.foodBasketService.getList(validDate);
        return list === null ? null : GroceryMapper.listToDto(list);
    }

    async createList(list: ListDto): Promise<void> {
        const validDate = toDate(list.date);
        const listProducts = list.products.map((listProduct) =>
            GroceryMapper.listProductToDao(listProduct, list),
        );
        const str = listProducts.map((lp) => listProductToString(lp)).join('/n');
        console.log(`valid date ${validDate.toDateString()}, mapped lp ${str}`);
        const listId = await this.foodBasketService.createNewList(validDate, listProducts);
        console.log(`listId = ${listId}`);
        return;
    }

    async getAllDates(): Promise<Date[]> {
        const lists = await this.foodBasketService.getAllLists();
        console.log(lists);
        return lists.map((list) => list.date);
    }

    async getAllProducts(): Promise<ProductDto[]> {
        const products = await this.foodBasketService.getAllProducts();
        return products.map((product) => GroceryMapper.productToDto(product));
    }
}
