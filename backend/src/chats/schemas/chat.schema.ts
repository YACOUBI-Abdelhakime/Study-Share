import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Message } from 'src/messages/schemas/message.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Chat {
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: User.name }])
  participants: User | Types.ObjectId[] = [];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Message.name }])
  messages: Message[] = [];

  @Prop()
  lastMessageAt: Date;
}

export const chatSchema = SchemaFactory.createForClass(Chat);

// @Prop([
//   {
//     type: Types.ObjectId,
//     ref: Message.name,
//     // autopopulate: false,
//   },
// ])
