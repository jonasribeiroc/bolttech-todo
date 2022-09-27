import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { AuthConfigGuard } from '@src/commons/services';
import { IUserSession, Task, UserSession } from '@src/commons';

@ApiTags('Tasks')
@Controller('projects/:projectId/tasks')
@UseGuards(AuthConfigGuard)
export class TaskController {
  constructor(private readonly projectService: TaskService) {}

  @Post()
  async createTask(
    @Param('projectId') projectId: string,
    @Body() createTaskDto: CreateTaskDto,
    @UserSession() userSession: IUserSession,
  ): Promise<Task> {
    return await this.projectService.createTask(projectId, userSession._id, createTaskDto);
  }

  @Put('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @UserSession() userSession: IUserSession,
  ): Promise<void> {
    return await this.projectService.updateTask(id, userSession._id, updateTaskDto);
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
    @UserSession() userSession: IUserSession,
  ): Promise<void> {
    return await this.projectService.deleteTask(id, projectId, userSession._id);
  }
}