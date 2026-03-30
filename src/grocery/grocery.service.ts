import { Injectable } from '@nestjs/common';
import { FileService } from 'src/shared/storage/file.service';
import { toValidListDto, toList } from 'src/shared/utils/StringUtils';
import { ListDto } from './dto/ListDto';

@Injectable()
export class GroceryService {
    constructor(private readonly fileService: FileService) {}

    async getList(date: string): Promise<ListDto> {
        const list = await this.fileService.getList(date);
        return toValidListDto(date, list);
    }

    async createList(list: ListDto): Promise<void> {
        await this.fileService.createList(list.date, toList(list));
    }

    async getAllDates(): Promise<string[]> {
        return await this.fileService.getAllDates();
    }
}
