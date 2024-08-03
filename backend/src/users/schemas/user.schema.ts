import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, MinLength } from 'class-validator';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  isVerified: boolean;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  @IsEmail()
  email: string;

  @Prop()
  @MinLength(8)
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
