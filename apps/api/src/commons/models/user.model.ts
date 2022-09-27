import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class IUserSession {
  _id: string;
  name: string;
  email: string;
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ unique: true, required: true, lowercase: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop()
  createdAt: Date;

  @ApiProperty()
  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
