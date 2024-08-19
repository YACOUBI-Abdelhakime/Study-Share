import {
  Injectable,
  ValidationPipe
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ValidationError } from 'class-validator';

@Injectable()
export class WsValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        // Construct the validation error message
        const message = errors
          .map((err) => Object.values(err.constraints || {}).join(', '))
          .join('; ');

        // Create a BadRequestException with the constructed message
        const wsException = new WsException(`Validation failed: ${message}`);

        // Throw the exception as a WsException to be caught by WebSocket filters
        return wsException;
      },
    });
  }
}
