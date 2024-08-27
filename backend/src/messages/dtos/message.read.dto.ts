import { IsNotEmpty, IsString } from 'class-validator';

export class MessageReadDto {
  @IsNotEmpty()
  @IsString()
  readonly messageId: string;
}
