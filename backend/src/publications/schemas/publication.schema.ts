import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PublicationTagEnum } from '../types/publication.tag.enum';
import { PublicationStatusEnum } from '../types/publication.status.enum';

@Schema({
  timestamps: true,
})
export class Publication {
  @Prop()
  userId: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  commentsCount: number;

  @Prop()
  status: PublicationStatusEnum;

  @Prop()
  tags: PublicationTagEnum[];
}

export const publicationSchema = SchemaFactory.createForClass(Publication);
