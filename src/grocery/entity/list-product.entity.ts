import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { List } from './list.entity';
import { Product } from './product.entity';

@Entity('list_product')
export class ListProduct {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'int', default: 1 })
    product_count!: number;

    @ManyToOne(() => List, (list) => list.listProducts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'list_id' })
    list!: List;

    @Column()
    list_id!: string;

    @ManyToOne(() => Product, (product) => product.listProducts, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column()
    product_id!: string;
}
