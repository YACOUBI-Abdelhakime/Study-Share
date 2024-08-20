import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  readonly chatName: string;
  @IsNotEmpty()
  @IsString()
  readonly receiverId: string;
}
