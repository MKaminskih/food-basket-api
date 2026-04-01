import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ListProduct } from './list-product.entity';

@Entity('list')
export class List {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'date', unique: true })
    date!: Date;

    @Column({ type: 'int', default: 0 })
    sum!: number;

    @OneToMany(() => ListProduct, (listProduct) => listProduct.list)
    listProducts!: ListProduct[];
}
