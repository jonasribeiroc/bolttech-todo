import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { IUserSession, Project } from '@src/commons/models';
import { UserSession } from '@src/commons/decorators';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { AuthConfigGuard } from '@src/commons/services';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthConfigGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiCreatedResponse({ type: [Project] })
  async getProjects(@UserSession() userSession: IUserSession): Promise<Project[]> {
    return await this.projectService.getProjects(userSession._id);
  }

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @UserSession() userSession: IUserSession,
  ): Promise<Project> {
    return await this.projectService.createProject(userSession._id, createProjectDto);
  }

  @Put('/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UserSession() userSession: IUserSession,
  ): Promise<void> {
    return await this.projectService.updateProject(id, userSession._id, updateProjectDto);
  }

  @Delete('/:id')
  async deleteProject(
    @Param('id') id: string,
    @UserSession() userSession: IUserSession,
  ): Promise<void> {
    return await this.projectService.deleteProject(id, userSession._id);
  }
}