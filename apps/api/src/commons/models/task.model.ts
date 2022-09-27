import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@src/commons/models';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: User;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ default: false })
  done: boolean;

  @ApiProperty()
  @Prop()
  createdAt: Date;

  @ApiProperty()
  @Prop()
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
