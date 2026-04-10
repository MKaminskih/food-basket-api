import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { ApiResponse } from '../dto/api-response.dto';
import { Response } from 'express';

interface HttpExceptionResponse {
    statusCode: number;
    message: string | string[];
    error: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Внутренняя ошибка сервера';

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (this.isHttpExceptionResponse(exceptionResponse)) {
                message = Array.isArray(exceptionResponse.message)
                    ? exceptionResponse.message.join(', ')
                    : exceptionResponse.message;
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        this.logger.error(
            `${request.method} ${request.url} - ${statusCode} ${message}`,
            exception instanceof Error ? exception.stack : '',
        );

        const errorResponse = ApiResponse.error(message, statusCode, {
            path: request.url,
            method: request.method,
            timeStamp: new Date().toISOString(),
        });

        response.status(statusCode).json(errorResponse);
    }

    private isHttpExceptionResponse(obj: unknown): obj is HttpExceptionResponse {
        return typeof obj === 'object' && obj !== null && 'statusCode' in obj && 'message' in obj;
    }
}
