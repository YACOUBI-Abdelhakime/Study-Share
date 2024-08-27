import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Message } from 'src/messages/schemas/message.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Chat {
  _id: string | null;

  @Prop()
  chatName: string | null;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: User.name }])
  participants: User[] | Types.ObjectId[] = [];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Message.name }])
  messages: Message[] = [];
}

export const chatSchema = SchemaFactory.createForClass(Chat);
