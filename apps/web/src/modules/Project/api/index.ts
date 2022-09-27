import environment from '@src/environments/environment';
import axios from '@src/plugins/axios';
import { CreateProjectDto, CreateTaskDto, IProject, UpdateProjectDto, UpdateTaskDto } from '../models';

const api = axios({ baseURL: environment.baseURL });

export async function getProjects(): Promise<IProject[]> {
  try {
    const response = await api.get(`/projects`);

    return response.data;
  } catch (error) {
    console.log('Error: ', error);
    return [];
  }
}

export async function postProject(data: CreateProjectDto) {
  try {
    const response = await api.post(`/projects/`, data);
    return response.data;
  } catch (error) {
    console.log('Error: ', error);
    return;
  }
}

export async function putProject(id: string, data: UpdateProjectDto) {
  try {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  } catch (error) {
    console.log('Error: ', error);
    return;
  }
}

export async function deleteProject(id: string) {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error: ', error);
    return;
  }
}

export async function postTask(projectId: string, data: CreateTaskDto) {
  try {
    const response = await api.post(`/projects/${projectId}/tasks`, data);
    return response.data;
  } catch (error) {
    console.log('Error: ', error);
    return;
  }
}

export async function putTask(id: string, projectId: string, data: UpdateTaskDto) {
  try {
    const response = await api.put(`/projects/${projectId}/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    console.log('Error: ', error);
    return;
  }
}

export async function deleteTask(id: string, projectId: string) {
  try {
    const response = await api.delete(`/projects/${projectId}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error: ', error);
    return;
  }
}

