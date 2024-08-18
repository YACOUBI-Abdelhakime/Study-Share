import {
  Catch,
  ArgumentsHost,
  WsExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException, UnauthorizedException)
export class WsExceptionsFilter implements WsExceptionFilter {
  catch(exception: WsException | UnauthorizedException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();

    if (exception instanceof UnauthorizedException) {
      client.emit('error', { message: 'Unauthorized access token' });
      client.disconnect();
    } else {
      client.emit('error', { message: exception.message });
    }
  }
}
