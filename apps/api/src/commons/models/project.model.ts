import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User, Task } from '@src/commons/models';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: User;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Task.name }] })
  tasks: Task[];

  @ApiProperty()
  @Prop()
  createdAt: Date;

  @ApiProperty()
  @Prop()
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
