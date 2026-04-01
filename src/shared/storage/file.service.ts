import { Injectable } from '@nestjs/common';
import { List } from 'src/grocery/file-entity/List';
import { getFilePath, LISTS_DIR } from '../constants';
import * as fs from 'fs/promises';
import { checkValidDate, isCorrectDate, sortAscend } from '../utils/DateUtils';

@Injectable()
export class FileService {
    private listOfProducts: Map<string, List> = new Map();

    async getList(date: string): Promise<List> {
        const validDate = checkValidDate(date);
        const filePath = getFilePath(`${validDate}.txt`);
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return new List(content);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                throw new Error(`Список за дату ${validDate} не существует.`); // файл не найден
            }
            throw error; // другая ошибка
        }
    }

    async createList(date: string, list: List): Promise<void> {
        const validDate = checkValidDate(date);
        await this.listExists(validDate);
        await this.addNewList(date, list);
    }

    async getAllDates(): Promise<string[]> {
        try {
            const fileNames = await fs.readdir(LISTS_DIR);

            return fileNames
                .filter((fileName) => fileName.endsWith('.txt'))
                .map((fileName) => fileName.replace('.txt', ''))
                .filter(isCorrectDate)
                .sort(sortAscend);
        } catch (error) {
            // Если папка не существует — возвращаем пустой массив
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                return [];
            }
            throw error; // другая ошибка
        }
    }

    async listExists(date: string): Promise<void> {
        const dates = await this.getAllDates();
        if (dates.includes(date)) {
            throw new Error(`Уже существует список с датой ${date}`);
        }
    }

    async addNewList(date: string, list: List): Promise<void> {
        try {
            const filePath = getFilePath(date + '.txt');
            const content = list.getLines().join('\n');
            await fs.writeFile(filePath, content);
            return;
        } catch (error) {
            console.log(`Во время создания файла ${date + '.txt'} произошла ошибка`);
            throw error;
        }
    }
}
