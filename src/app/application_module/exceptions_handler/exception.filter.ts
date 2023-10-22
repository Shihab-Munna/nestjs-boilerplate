import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import typeormQueryFailedMessageUtil from '../utils/typeormQueryFailedMessage.util';
import { AppException } from './app.exception';

@Catch()
export class FilterException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log('⛔ Call From All Exception Handler ⛔', exception);

    let statusCode: number;
    const errorMessages: string[] = [exception.message];

    if (exception instanceof AppException) {
      // Handle specific application exceptions here
    } else if (exception instanceof TypeError) {
      this.handleTypeError(exception);
    } else if (exception instanceof HttpException) {
      this.handleHttpException(exception);
    } else if (exception instanceof QueryFailedError) {
      this.handleQueryFailedError(exception);
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      this.handleGenericException(exception);
    }

    this.logError(exception);
    this.sendErrorResponse(response, statusCode, errorMessages);
  }

  private handleTypeError(exception: TypeError) {
    console.log(exception.message, exception.stack, exception.name);
    const defaultMessage = exception.message || 'Internal Server Error';
    const errorMessages = [defaultMessage];
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    this.updateErrorMessagesAndStatusCode(statusCode, errorMessages);
  }

  private handleHttpException(exception: HttpException) {
    const statusCode = exception.getStatus();
    const response: any = exception.getResponse();
    const errorMessages =
      typeof response?.message === 'string'
        ? [response?.message]
        : response?.message;
    this.updateErrorMessagesAndStatusCode(statusCode, errorMessages);
  }

  private handleQueryFailedError(exception: QueryFailedError) {
    const statusCode = HttpStatus.BAD_REQUEST;
    const errorMessages = typeormQueryFailedMessageUtil(exception);
    this.updateErrorMessagesAndStatusCode(statusCode, errorMessages);
  }

  private handleGenericException(exception: any) {
    const defaultMessage = 'Internal Server Error';
    const errorMessages = [exception.message || defaultMessage];
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    this.updateErrorMessagesAndStatusCode(statusCode, errorMessages);
  }

  private logError(exception: any) {
    console.log(exception.message, exception);
  }

  private sendErrorResponse(
    response: any,
    statusCode: number,
    errorMessages: string[],
  ) {
    const res = {
      success: false,
      statusCode,
      message: errorMessages[0] || 'Something went wrong',
      errorMessages,
      devMessage: 'Something went wrong',
    };
    response.status(statusCode).json(res);
  }

  private updateErrorMessagesAndStatusCode(
    statusCode: number,
    errorMessages: string[],
  ) {
    console.log(errorMessages[0]);
    statusCode = statusCode;
    errorMessages = errorMessages;
  }
}
