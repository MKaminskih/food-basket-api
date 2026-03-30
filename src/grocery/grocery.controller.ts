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
        return await this.groceryService.getList(date);
    }

    @Post('list')
    async createList(@Body() list: ListDto) {
        await this.groceryService.createList(list);
        return {
            message: `Список продуктов в ${list.date} успешно создан`,
        };
    }
}
