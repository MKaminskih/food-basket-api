import { Injectable, Logger } from '@nestjs/common';
import { toDate } from 'src/shared/utils/DateUtils';
import { ListDto } from './dto/ListDto';
import { GroceryMapper } from './mapper/GroceryMapper';
import { ProductDto } from './dto/ProductDto';
import { FoodBasketService } from 'src/shared/storage/db/food.basket.service';
import { listProductToString } from 'src/shared/constants';

@Injectable()
export class GroceryService {
    private readonly logger = new Logger(GroceryService.name);

    constructor(private readonly foodBasketService: FoodBasketService) {}

    async getList(date: string): Promise<ListDto | null> {
        const validDate = toDate(date);
        const list = await this.foodBasketService.getList(validDate);
        return list === null ? null : GroceryMapper.listToDto(list);
    }

    async createList(list: ListDto): Promise<string> {
        const validDate = toDate(list.date);
        const listProducts = list.products.map((listProduct) =>
            GroceryMapper.listProductToDao(listProduct, list),
        );
        const str = listProducts.map((lp) => listProductToString(lp)).join('/n');
        this.logger.debug(`valid date ${validDate.toDateString()}, mapped lp ${str}`);
        const listId = await this.foodBasketService.createNewList(validDate, listProducts);
        this.logger.log(`listId = ${listId}`);
        return listId;
    }

    async getAllDates(): Promise<Date[]> {
        const lists = await this.foodBasketService.getAllLists();
        return lists.map((list) => list.date);
    }

    async getAllProducts(): Promise<ProductDto[]> {
        const products = await this.foodBasketService.getAllProducts();
        return products.map((product) => GroceryMapper.productToDto(product));
    }
}
