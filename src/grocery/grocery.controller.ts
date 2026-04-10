import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { ListDto } from './dto/ListDto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('grocery')
export class GroceryController {
    constructor(private readonly groceryService: GroceryService) {}

    @Get('dates')
    async getAllDates() {
        const dates = await this.groceryService.getAllDates();
        return ApiResponse.success(dates, 'Список дат успешно получен');
    }

    @Get('list/:date')
    async getList(@Param('date') date: string) {
        const list = await this.groceryService.getList(date);
        if (!list) {
            throw new HttpException(
                `Не удалось найти список продуктов в ${date}`,
                HttpStatus.NOT_FOUND,
            );
        }
        return ApiResponse.success(list, 'Список успешно получен');
    }

    @Get('products')
    async getAllProducts() {
        const products = await this.groceryService.getAllProducts();
        return ApiResponse.success(products, 'Список продуктов успешно получен');
    }

    @Post('list')
    async createList(@Body() list: ListDto) {
        try {
            const listId = await this.groceryService.createList(list);
            return ApiResponse.success(
                listId,
                `Список продуктов в ${list.date} успешно создан`,
                HttpStatus.CREATED,
            );
        } catch (error) {
            throw new HttpException(
                error instanceof Error
                    ? error.message
                    : `Не удалось создать cписок продуктов в ${list.date}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
