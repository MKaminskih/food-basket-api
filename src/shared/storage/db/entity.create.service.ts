import { Injectable } from '@nestjs/common';
import { ListProduct } from 'src/grocery/entity/list-product.entity';
import { List } from 'src/grocery/entity/list.entity';
import { Product } from 'src/grocery/entity/product.entity';
import { listProductToString, listToString, productToString } from 'src/shared/constants';
import { EntityManager } from 'typeorm';

@Injectable()
export class EntityCreateService {
    constructor() {}

    async createList(date: Date, manager: EntityManager): Promise<List> {
        const list = manager.create(List, { date });
        const created = await manager.save(List, list);
        console.log(`created list = ${listToString(created)}`);
        return created;
    }

    async createProduct(
        name: string,
        size: string | undefined,
        manager: EntityManager,
    ): Promise<Product> {
        const newProduct = manager.create(Product, { name, size });
        const createdProduct = await manager.save(Product, newProduct);
        console.log(`created product = ${productToString(createdProduct)}`);
        return createdProduct;
    }

    async createListProduct(
        list_id: string,
        product_id: string,
        product_count: number,
        manager: EntityManager,
    ): Promise<ListProduct> {
        const listProduct = manager.create(ListProduct, {
            list_id,
            product_id,
            product_count,
        });
        const created = await manager.save(ListProduct, listProduct);
        console.log(`create lp ${listProductToString(created)}`);
        return created;
    }
}
