import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, MinLength } from 'class-validator';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dateOfBirth: string;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @MinLength(8)
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
