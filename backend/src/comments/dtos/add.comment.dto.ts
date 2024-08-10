import { IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddCommentDto {
  @IsEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  publicationId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
