import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FindAllSuccessResponse } from '../types/findAllSuccess.response';
import { SuccessResponse } from '../types/successResponse.type';

@Injectable()
export class FilterResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((content: any) => {
        console.log('Log from Response interceptor');

        if (content instanceof Error) {
          throw content;
        }

        if (content instanceof SuccessResponse) {
          return content;
        }

        if (content instanceof FindAllSuccessResponse) {
          return content;
        }

        if (content && content.success === false) {
          throw content;
        }

        if (content === undefined) {
          return new SuccessResponse({
            message: 'No data found',
            payload: null,
          });
        }

        if (content && content.isUpdated === true) {
          return content;
        }

        if (typeof content === 'object' || Array.isArray(content)) {
          return new SuccessResponse({
            payload: content,
            message: 'Successful response',
          });
        }

        if (
          typeof content === 'string' ||
          typeof content === 'number' ||
          typeof content === 'boolean'
        ) {
          return new SuccessResponse({
            message: 'Successful response',
            payload: { content },
          });
        }

        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
