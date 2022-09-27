import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Project, ProjectSchema, Task, TaskSchema } from '@src/commons/models';
import { AuthConfigModule } from '@src/commons/services';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    AuthConfigModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
