import { IsNotEmpty, IsString } from 'class-validator';

export class AddCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly publicationId: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
