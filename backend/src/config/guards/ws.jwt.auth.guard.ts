import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const wsContext = context.switchToWs();
    return wsContext.getClient().handshake;
  }
}
