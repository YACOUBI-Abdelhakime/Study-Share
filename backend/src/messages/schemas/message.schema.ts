import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Message {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  senderId: Types.ObjectId;

  @Prop({
    required: true,
  })
  content: string;
}

export const messageSchema = SchemaFactory.createForClass(Message);
