import { Module } from '@nestjs/common';
import { FileService } from './storage/file.service';

@Module({
    providers: [FileService],
})
export class SharedModule {}
