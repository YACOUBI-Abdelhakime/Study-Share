import { IsNotEmpty, IsString } from 'class-validator';

export class AddMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly chatId: string;

  @IsNotEmpty()
  @IsString()
  readonly receiverId: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
