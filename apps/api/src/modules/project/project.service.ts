import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Project, ProjectDocument, Task } from '@src/commons/models';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
  ) {}

  async getProjects(user: string): Promise<Project[]> {
    return await this.projectModel
      .find({ user })
      .populate('tasks', null, Task.name)
      .exec();
  }

  async createProject(user: string, createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectModel.create({ ...createProjectDto, user });
  }

  async updateProject(_id: string, user: string, updateProjectDto: UpdateProjectDto): Promise<void> {
    const project = await this.projectModel.findOneAndUpdate({ _id, user }, updateProjectDto);
    if (!project) throw new NotFoundException();
  }

  async deleteProject(_id: string, user: string): Promise<void> {
    const project = await this.projectModel.findOneAndDelete({ _id, user });
    if (!project) throw new NotFoundException();
  }
}
