import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ListProduct } from 'src/grocery/entity/list-product.entity';
import { List } from 'src/grocery/entity/list.entity';
import { Product } from 'src/grocery/entity/product.entity';
import { listProductToString } from 'src/shared/constants';
import { EntityManager, Repository } from 'typeorm';
import { EntityCreateService } from './entity.create.service';

@Injectable()
export class FoodBasketService {
    constructor(
        @InjectRepository(List) private listRepo: Repository<List>,
        @InjectRepository(Product) private productRepo: Repository<Product>,
        private readonly entityCreateService: EntityCreateService,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async getList(date: Date): Promise<List | null> {
        return await this.listRepo.findOne({
            where: { date },
            relations: ['listProducts', 'listProducts.product'],
        });
    }

    async getAllLists(): Promise<List[]> {
        return await this.listRepo.find({
            select: ['date'],
            order: { date: 'ASC' },
        });
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepo.find({
            order: { name: 'ASC' },
        });
    }

    async createNewList(date: Date, listProducts: ListProduct[]): Promise<string> {
        return await this.entityManager.transaction(async (manager) => {
            const listId = (await this.entityCreateService.createList(date, manager)).id;
            for (const listProduct of listProducts) {
                console.log(`lp from request ${listProductToString(listProduct)}`);
                const productId = await this.getOrCreateProductId(listProduct.product, manager);
                await this.entityCreateService.createListProduct(
                    listId,
                    productId,
                    listProduct.product_count,
                    manager,
                );
            }
            return listId;
        });
    }

    async getOrCreateProductId(product: Product, manager: EntityManager): Promise<string> {
        if (product.id !== '') return product.id;
        if (product.name !== '') throw new Error('Некорректное название продукта для сохранения');
        const existed = await manager.findOne(Product, {
            where: { name: product.name, size: product.size },
        });
        if (existed) return existed.id;
        return (await this.entityCreateService.createProduct(product.name, product.size, manager))
            .id;
    }
}
