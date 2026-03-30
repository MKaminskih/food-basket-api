import { Module } from '@nestjs/common';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { FileService } from 'src/shared/storage/file.service';

@Module({
    controllers: [GroceryController],
    providers: [GroceryService, FileService],
})
export class GroceryModule {}
