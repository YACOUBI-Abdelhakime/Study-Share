import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { PublicationTagEnum } from '../types/publication.tag.enum';

export class UpdatePublicationsDto {
  @IsEmpty()
  userId: Types.ObjectId;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsEmpty()
  commentsCount: number;

  @IsOptional()
  @IsBoolean()
  isDiscussionOpen: boolean;

  @IsOptional()
  @IsEnum(PublicationTagEnum, {
    each: true,
    message: `Tags must be one of the following values: [${Object.values(PublicationTagEnum).join(', ')}]`,
  })
  tags: PublicationTagEnum[];
}
