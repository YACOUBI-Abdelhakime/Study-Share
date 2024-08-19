import {
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Server, Socket } from 'socket.io';
import { WsExceptionsFilter } from 'src/config/filters/ws.exceptions.filter';
import { WsJwtAuthGuard } from 'src/config/guards/ws.jwt.auth.guard';
import { WsValidationPipe } from 'src/config/pipes/ws.validation.pipe';
import { jwtVerify } from 'src/config/utils/jwt.verify';
import { AddMessageDto } from 'src/messages/dtos/add.message.dto';
import { ChatsService } from './chats.service';
import { Message } from 'src/messages/schemas/message.schema';
import { Chat } from './schemas/chat.schema';

@UseGuards(WsJwtAuthGuard)
@UseFilters(new WsExceptionsFilter())
@WebSocketGateway(3001, { origin: process.env.APP_IP, namespace: '/chats' })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatsService: ChatsService) {}
  // Store connected users: userId -> socketId
  private connectedUsers: Map<string, string> = new Map();

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    let payload;
    try {
      payload = jwtVerify(client.handshake.headers.authorization.split(' ')[1]);
    } catch (error) {
      client.emit('error', { message: 'Unauthorized access token' });
      client.disconnect();
    }
    // Add user to the connected users list
    this.connectedUsers.set(payload.user._id, client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UsePipes(new WsValidationPipe())
  @UseFilters(new WsExceptionsFilter())
  @SubscribeMessage('message')
  async handleMessage(
    sender: Socket,
    addMessageDto: AddMessageDto,
  ): Promise<void> {
    const senderId: string = (sender.handshake as any).user?.user?._id;
    const senderSocketId: string = sender.id;

    // Find the receiver socket id from the connected users list
    const receiverSocketId = this.connectedUsers.get(addMessageDto.receiverId);
    let addedMessage: Chat;
    try {
      // Add message to the database
      addedMessage = await this.chatsService.addChatMessage(
        addMessageDto,
        senderId,
      );
    } catch (error) {
      // Emit the error message to the sender
      sender.emit('error', { message: error.message });
      return;
    }

    // Emit the message to the receiver
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('message', addedMessage);
    }

    // Emit the message to the sender
    this.server.to(senderSocketId).emit('message', addedMessage);
  }
}
