import { Module } from '@nestjs/common';
import { GroceryModule } from './grocery/grocery.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [GroceryModule, SharedModule],
})
export class AppModule {}
