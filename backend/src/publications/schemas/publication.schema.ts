import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PublicationTagEnum } from '../types/publication.tag.enum';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Publication {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: 0 })
  commentsCount: number;

  @Prop({ required: true, default: true })
  isDiscussionOpen: boolean;

  @Prop({ required: true, default: [] })
  tags: PublicationTagEnum[];
}

export const publicationSchema = SchemaFactory.createForClass(Publication);
