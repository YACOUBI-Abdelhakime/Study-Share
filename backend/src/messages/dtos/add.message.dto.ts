import { IsNotEmpty, IsString } from 'class-validator';

export class AddMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly chatId: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
