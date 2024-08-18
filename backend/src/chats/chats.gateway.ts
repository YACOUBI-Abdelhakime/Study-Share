import { UseFilters, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsExceptionsFilter } from 'src/config/filters/ws.exceptions.filter';
import { WsJwtAuthGuard } from 'src/config/guards/ws.jwt.auth.guard';
import { jwtVerify } from 'src/config/utils/jwt.verify';

@UseGuards(WsJwtAuthGuard)
@UseFilters(new WsExceptionsFilter())
@WebSocketGateway(3001, { origin: process.env.APP_IP, namespace: '/chats' })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    let payload;
    try {
      payload = jwtVerify(client.handshake.headers.authorization.split(' ')[1]);
      /// TODO: Add user to the users list
    } catch (error) {
      client.emit('error', { message: 'Unauthorized access token' });
      client.disconnect();
    }
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    const senderId = client.id;
    const userName: any = (client.handshake as any).user?.user?.name;
    this.server.emit(
      'message',
      `Sender <${senderId}> Res>>>${payload} ;; User>>>${userName}`,
    );
  }
}
