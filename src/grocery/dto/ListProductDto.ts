export class ListProductDto {
    id: string;
    name: string;
    size: string | undefined;
    count: number;

    constructor(id: string, name: string, size: string | undefined, count: number) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.count = count;
    }
}
