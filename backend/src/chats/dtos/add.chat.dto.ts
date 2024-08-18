import { IsNotEmpty, IsString } from 'class-validator';

export class AddChatDto {
  @IsNotEmpty()
  @IsString()
  readonly receiverId: string;
}
