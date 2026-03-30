import { ProductDto } from './ProductDto';

export class ListDto {
    date: string;
    products: ProductDto[];
    sum: number;

    constructor(date: string, products: ProductDto[], sum: number) {
        this.date = date;
        this.products = products;
        this.sum = sum;
    }
}
