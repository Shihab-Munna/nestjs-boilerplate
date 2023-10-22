import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(message: string, status = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }

  // All custom exception should be handled here
}
