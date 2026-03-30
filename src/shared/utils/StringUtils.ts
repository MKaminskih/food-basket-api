import { ListDto } from 'src/grocery/dto/ListDto';
import { ProductDto } from 'src/grocery/dto/ProductDto';
import { List } from 'src/grocery/entity/List';

const enter = /\r?\n/;
const isOnlyDigits = /^\d+$/;
export const separator = '---';
const validLine =
    /^[0-9a-zA-Za-яА-ЯёЁ%\s]+((\s-\s){1}(\d){1,4}([a-яА-Я]{1,2}))?((\s\(){1}(\d){1,2}(\)){1})?$/;
const validLineWithCount =
    /^[0-9a-zA-Za-яА-ЯёЁ%\s]+((\s-\s){1}(\d){1,4}([a-яА-Я]{1,2}))?(\s\(){1}(\d){1,2}(\)){1}$/;

export function splitLines(content: string): string[] {
    return content
        .split(enter)
        .map((line) => line.trim())
        .filter((line) => line !== '');
}

const validateLine = (line: string): boolean => {
    return line !== separator && validLine.test(line) && !isOnlyDigits.test(line);
};

function toProductDto(line: string): ProductDto {
    if (validLineWithCount.test(line)) {
        const list = line.split(' (');
        return new ProductDto(list[0], parseNum(list[1].substring(0, list[1].length - 1), 1));
    } else {
        return new ProductDto(line, 1);
    }
}

export function toValidListDto(date: string, list: List): ListDto {
    let sum: number = 0;
    const separatorIndex = list.getLines().findIndex((line) => line === separator);
    if (separatorIndex !== -1) {
        sum = parseNum(list.popLine());
        if (separatorIndex < list.getLines().length) {
            list.popLine();
        }
    }
    const products = list.getLines().filter(validateLine).map(toProductDto);
    return new ListDto(date, products, sum);
}

export function toList(list: ListDto): List {
    const content = list.products.map((product) => productToStr(product));
    content.push(separator);
    content.push(list.sum.toString());
    return new List(content);
}

function parseNum(num: string | undefined, defaultNum: number = 0): number {
    if (num === undefined) {
        return defaultNum;
    } else {
        const parsed = parseInt(num, 10);
        return isNaN(parsed) ? defaultNum : parsed;
    }
}

function productToStr(product: ProductDto): string {
    return `${product.name} (${product.count})`;
}
