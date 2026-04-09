import { ListProductDto } from './ListProductDto';

export class ListDto {
    date: string;
    products: ListProductDto[];
    sum: number;

    constructor(date: string, products: ListProductDto[], sum: number) {
        this.date = date;
        this.products = products;
        this.sum = sum;
    }
}
