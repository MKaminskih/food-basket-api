import { Entity, OneToMany, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { ListProduct } from './list-product.entity';

@Entity('product')
@Index(['name', 'size'], {
    unique: true,
    where: '"size" IS NOT NULL',
})
@Index(['name'], {
    unique: true,
    where: '"size" IS NULL',
})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    size!: string | undefined;

    @OneToMany(() => ListProduct, (listProduct) => listProduct.product)
    listProducts!: ListProduct[];
}
