import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  UnauthorizedException,
  WsExceptionFilter,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'Socket.io';

@Catch(WsException, UnauthorizedException)
export class WsExceptionsFilter implements WsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();

    switch (exception.constructor) {
      case UnauthorizedException: {
        client.emit('error', { message: 'Unauthorized access token' });
        client.disconnect();
        break;
      }
      case WsException: {
        client.emit('error', { message: exception.message });
        break;
      }
    }
  }
}
