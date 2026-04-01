import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from './grocery/entity/product.entity';
import { List } from './grocery/entity/list.entity';
import { ListProduct } from './grocery/entity/list-product.entity';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA,
    entities: [Product, List, ListProduct],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
});
