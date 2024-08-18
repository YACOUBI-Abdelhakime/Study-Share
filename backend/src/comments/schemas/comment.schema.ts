import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Comment {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  publicationId: Types.ObjectId;

  @Prop({ required: true })
  content: string;
}

export const commentSchema = SchemaFactory.createForClass(Comment);
