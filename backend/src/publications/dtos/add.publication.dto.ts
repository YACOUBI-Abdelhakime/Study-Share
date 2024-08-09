import { IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { PublicationTagEnum } from '../types/publication.tag.enum';

export class AddPublicationsDto {
  @IsEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEmpty()
  commentsCount: number;

  @IsEmpty()
  isDiscussionOpen: boolean;

  @IsNotEmpty()
  @IsEnum(PublicationTagEnum, {
    each: true,
    message: `Tags must be one of the following values: [${Object.values(PublicationTagEnum).join(', ')}]`,
  })
  tags: PublicationTagEnum[];
}
