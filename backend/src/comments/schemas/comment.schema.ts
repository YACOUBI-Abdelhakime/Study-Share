import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop()
  userId: Types.ObjectId;

  @Prop()
  publicationId: Types.ObjectId;

  @Prop()
  content: string;
}

export const commentSchema = SchemaFactory.createForClass(Comment);
