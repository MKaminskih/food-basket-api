export class ProductDto {
    id: string;
    name: string;
    size: string | undefined;

    constructor(id: string, name: string, size: string | undefined) {
        this.id = id;
        this.name = name;
        this.size = size;
    }
}
