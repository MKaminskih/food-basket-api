import { ListDto } from '../dto/ListDto';
import { ListProductDto } from '../dto/ListProductDto';
import { List } from './../entity/list.entity';
import { checkValidDate } from './../../shared/utils/DateUtils';
import { ListProduct } from '../entity/list-product.entity';
import { Product } from '../entity/product.entity';
import { ProductDto } from '../dto/ProductDto';
import { toDate } from 'node_modules/date-fns';

export class GroceryMapper {
    static listToDto(list: List): ListDto {
        return {
            date: checkValidDate(list.date),
            products: list.listProducts.map((listProduct) => this.listProductToDto(listProduct)),
            sum: list.sum,
        };
    }

    static listProductToDto(listProduct: ListProduct): ListProductDto {
        return {
            id: listProduct.product.id,
            name: listProduct.product.name,
            size: listProduct.product.size,
            count: listProduct.product_count,
        };
    }

    static productToDto(product: Product): ProductDto {
        return {
            id: product.id,
            name: product.name,
            size: product.size,
        };
    }

    static listToDao(list: ListDto): List {
        return {
            id: '',
            date: toDate(list.date),
            sum: list.sum,
            listProducts: [],
        };
    }

    static listProductToDao(listProduct: ListProductDto, list: ListDto): ListProduct {
        return {
            id: '',
            product_count: listProduct.count,
            product: {
                id: listProduct.id,
                name: listProduct.name,
                size: listProduct.size,
                listProducts: [],
            },
            list: this.listToDao(list),
            list_id: '',
            product_id: '',
        };
    }
}
