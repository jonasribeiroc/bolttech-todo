import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Project, ProjectDocument, Task, TaskDocument } from '@src/commons/models';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async createTask(projectId: string, user: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectModel.findOne({ _id: projectId, user });
    if (!project) throw new NotFoundException();
    const task = await this.taskModel.create({ ...createTaskDto, user });
    await this.projectModel.findOneAndUpdate({ _id: projectId }, { $push: { tasks: task._id  } });
    return task;
  }

  async updateTask(_id: string, user: string, updateTaskDto: UpdateTaskDto): Promise<void> {
    const task = await this.taskModel.findOneAndUpdate({ _id, user, done: false }, updateTaskDto);
    if (!task) throw new NotFoundException();
  }

  async deleteTask(_id: string, projectId: string, user: string): Promise<void> {
    const project = await this.projectModel.findOne({ _id: projectId, user });
    if (!project) throw new NotFoundException();
    const task = await this.taskModel.findOneAndDelete({ _id, user, done: false });
    if (!task) throw new NotFoundException();
    await this.projectModel.findOneAndUpdate({ _id: projectId }, { $pull: { tasks: _id  } });
  }
}
