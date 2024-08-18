import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsISO8601,
  IsEmpty,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsISO8601()
  readonly dateOfBirth: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEmpty()
  isVerified: boolean;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
