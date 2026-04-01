import { Module } from '@nestjs/common';
import { GroceryModule } from './grocery/grocery.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('Db_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                schema: configService.get('DB_SCHEMA'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
                logging: true, // для отладки — видим все SQL запросы
            }),
            inject: [ConfigService],
        }),
        GroceryModule,
        SharedModule,
    ],
})
export class AppModule {}
