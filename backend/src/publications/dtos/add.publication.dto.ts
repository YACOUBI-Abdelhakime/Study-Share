import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PublicationTagEnum } from '../types/publication.tag.enum';

export class AddPublicationDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsEnum(PublicationTagEnum, {
    each: true,
    message: `Tags must be one of the following values: [${Object.values(PublicationTagEnum).join(', ')}]`,
  })
  readonly tags: PublicationTagEnum[];
}
