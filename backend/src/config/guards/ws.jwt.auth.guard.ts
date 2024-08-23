import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const wsContext = context.switchToWs();
    const client = wsContext.getClient();

    // Extract the token from client.handshake.auth
    const authToken = client.handshake.auth?.token;

    // If token exists, simulate a request object with the authorization header
    if (authToken) {
      client.handshake.headers.authorization = `Bearer ${authToken}`;
    }

    // Return the modified handshake as the request object
    return client.handshake;
  }
}
