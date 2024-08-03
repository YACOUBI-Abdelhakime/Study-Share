import { IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PublicationTagEnum } from '../types/publication.tag.enum';

export class AddPublicationsDto {
  @IsEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEmpty()
  commentsCount: any;

  @IsEmpty()
  status: any;

  @IsNotEmpty()
  @IsEnum(PublicationTagEnum, {
    each: true,
    message: `Tags must be one of the following values: [${Object.values(PublicationTagEnum).join(', ')}]`,
  })
  tags: PublicationTagEnum[];
}
