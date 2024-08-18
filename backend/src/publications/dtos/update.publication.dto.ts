import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';
import { PublicationTagEnum } from '../types/publication.tag.enum';

export class UpdatePublicationDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsBoolean()
  readonly isDiscussionOpen: boolean;

  @IsOptional()
  @IsEnum(PublicationTagEnum, {
    each: true,
    message: `Tags must be one of the following values: [${Object.values(PublicationTagEnum).join(', ')}]`,
  })
  readonly tags: PublicationTagEnum[];
}
