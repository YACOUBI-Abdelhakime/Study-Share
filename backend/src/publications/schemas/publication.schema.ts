import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PublicationTagEnum } from '../types/publication.tag.enum';

@Schema({
  timestamps: true,
})
export class Publication {
  @Prop()
  userId: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  commentsCount: number;

  @Prop()
  isDiscussionOpen: boolean;

  @Prop()
  tags: PublicationTagEnum[];
}

export const publicationSchema = SchemaFactory.createForClass(Publication);
