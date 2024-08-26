import { UseFilters, UseGuards, UsePipes } from '@nestjs/common';
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
import { WsValidationPipe } from 'src/config/pipes/ws.validation.pipe';
import { jwtVerify } from 'src/config/utils/jwt.verify';
import { AddMessageDto } from 'src/messages/dtos/add.message.dto';
import { ChatsService } from './chats.service';
import { Chat } from './schemas/chat.schema';
import { User } from 'src/users/schemas/user.schema';

@UseGuards(WsJwtAuthGuard)
@UseFilters(new WsExceptionsFilter())
@WebSocketGateway(3001, {
  origin: '*',
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatsService: ChatsService) {}
  // Store connected users: userId -> socketId
  private connectedUsers: Map<string, string> = new Map();

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    let payload;
    try {
      payload = jwtVerify(client.handshake.auth.token as string);

      this.connectedUsers.set(payload.user._id, client.id);
      console.log('OK connection:', client.id);
    } catch (error) {
      console.log('Error in connection:', error.message);
      client.emit('error', { message: error.message });
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedUsers.delete(client.id);
  }

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
    let updatedChat: Chat;
    try {
      // Add message to the database
      updatedChat = await this.chatsService.addChatMessage(
        addMessageDto,
        senderId,
      );
    } catch (error) {
      // Emit the error message to the sender
      sender.emit('error', { message: error.message });
      return;
    }

    const participants = updatedChat.participants;
    // Emit the message to the receiver
    if (receiverSocketId) {
      participants.forEach((participant) => {
        if (participant._id != addMessageDto.receiverId) {
          updatedChat.chatName = participant.name;
        }
      });
      this.server.to(receiverSocketId).emit('message', updatedChat);
    }

    // Emit the message to the sender
    participants.forEach((participant) => {
      if (participant._id != senderId) {
        updatedChat.chatName = participant.name;
      }
    }); 
    this.server.to(senderSocketId).emit('message', updatedChat);
  }
}
