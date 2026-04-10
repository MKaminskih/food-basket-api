import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T = any> {
    @ApiProperty({ example: true })
    success!: boolean;

    @ApiProperty({ example: 'Операция выполнена успешно' })
    message!: string;

    @ApiProperty({ required: false })
    data?: T;

    @ApiProperty({ required: false, example: 200 })
    statusCode?: number;

    @ApiProperty({ required: false, example: '2026-04-09T12:00:00.000Z' })
    timestamp?: string;

    constructor(patrial: Partial<ApiResponse<T>>) {
        Object.assign(this, patrial);
        this.timestamp = patrial.timestamp || new Date().toISOString();
    }

    static success<T>(data: T, message = 'Успешно', statusCode = 200): ApiResponse<T> {
        return new ApiResponse<T>({
            success: true,
            message,
            data,
            statusCode,
        });
    }

    static error(message: string, statusCode = 400, data?: unknown): ApiResponse {
        return new ApiResponse({
            success: false,
            message,
            data,
            statusCode,
        });
    }
}
