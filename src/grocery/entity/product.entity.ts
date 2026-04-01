import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ListProduct } from './list-product.entity';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    name!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    size!: string;

    @OneToMany(() => ListProduct, (listProduct) => listProduct.product)
    listProducts!: ListProduct[];
}
