import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { ListDto } from './dto/ListDto';

// все маршруты будут начинаться с /grocery
@Controller('grocery')
export class GroceryController {
    constructor(private readonly groceryService: GroceryService) {}

    @Get('dates')
    async getAllDates() {
        const dates = await this.groceryService.getAllDates();
        return { dates };
    }

    @Get('list/:date')
    async getList(@Param('date') date: string) {
        const list = await this.groceryService.getList(date);
        if (list === null) {
            return {
                message: `Не удалось найти список продуктов в ${date}`,
            };
        } else {
            return list;
        }
    }

    @Get('products')
    async getAllProducts() {
        return await this.groceryService.getAllProducts();
    }

    @Post('list')
    async createList(@Body() list: ListDto) {
        try {
            await this.groceryService.createList(list);
            return {
                message: `Список продуктов в ${list.date} успешно создан`,
            };
        } catch (error) {
            console.log(error);
            return {
                message: `Не удалось создать cписок продуктов в ${list.date}`,
            };
        }
    }
}
