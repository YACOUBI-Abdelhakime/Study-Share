import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PublicationTagEnum } from '../types/publication.tag.enum';
import { PublicationStatusEnum } from '../types/publication.status.enum';

export class UpdatePublicationsDto {
  @IsEmpty()
  userId: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  commentsCount: any;

  @IsOptional()
  @IsEnum(PublicationStatusEnum, {
    each: true,
    message: `Status must be one of the following values: [${Object.values(PublicationStatusEnum).join(', ')}]`,
  })
  status: PublicationStatusEnum;

  @IsOptional()
  @IsEnum(PublicationTagEnum, {
    each: true,
    message: `Tags must be one of the following values: [${Object.values(PublicationTagEnum).join(', ')}]`,
  })
  tags: PublicationTagEnum[];
}
