// src/shared/constants.ts
import * as path from 'path';
import { ListProduct } from 'src/grocery/entity/list-product.entity';
import { List } from 'src/grocery/entity/list.entity';
import { Product } from 'src/grocery/entity/product.entity';

// Корневая папка проекта
const ROOT_DIR = process.cwd();

// Папка с данными
const DATA_DIR = path.join(ROOT_DIR, 'data');

// Папка со списками покупок
export const LISTS_DIR = path.join(DATA_DIR, 'lists');

export function getFilePath(fileName: string): string {
    return path.join(LISTS_DIR, fileName);
}

export const listProductToString = (listProduct: ListProduct) => {
    return `id = ${listProduct.id}, product = ${productToString(listProduct.product)}, list_id = ${listProduct.list_id}, product_id = ${listProduct.product_id}`;
};

export const productToString = (product: Product) => {
    return `id = ${product?.id}, name = ${product?.name}, size = ${product?.size}`;
};

export const listToString = (list: List) => {
    return `id = ${list.id}, date = ${list.date.toDateString()}, sum = ${list.sum}`;
};
