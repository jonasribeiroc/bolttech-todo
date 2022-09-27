import { useEffect, useState } from 'react';
import { CreateProjectDto, CreateTaskDto, IProject, ITask, UpdateProjectDto, UpdateTaskDto } from '@src/modules/Project/models';
import { getProjects, postProject, putProject, deleteProject, postTask, putTask, deleteTask } from '@src/modules/Project/api';

export function useProduct() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchProjects() {
    try {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
      setIsLoading(false);
    } catch (error) {
      console.log('ERROR!', error);
    }
  }

  async function createProject(data: CreateProjectDto) {
    try {
      const project = await postProject(data);
      setProjects([...projects, project])
    } catch (error) {
      console.log('ERROR!', error);
    }
  }

  async function updateProject(id: string, data: UpdateProjectDto) {
    try {
      await putProject(id, data);
    } catch (error) {
      console.log('ERROR!', error);
    }
  }

  async function removeProject(id: string) {
    try {
      await deleteProject(id);

      const dataProjects = projects?.filter(item => item._id !== id);
      setProjects(dataProjects);
    } catch (error) {
      console.log('ERROR!', error);
    }
  }

  async function createTask(projectId: string, data: CreateTaskDto) {
    try {
      const task = await postTask(projectId, data);
      
      const index = projects.findIndex(item => item._id === projectId);
      const dataProjects = [...projects];
      dataProjects[index].tasks.push(task);
      setProjects(dataProjects);
    } catch (error) {
      console.log('ERROR!', error);
    }
  }

  async function updateTask(id: string, projectId: string, data: UpdateTaskDto) {
    try {
      await putTask(id, projectId, data);

      const indexP = projects.findIndex(item => item._id === projectId);
      const indexT = projects[indexP].tasks.findIndex(item => item._id === id);
      const dataProjects = [...projects];
      dataProjects[indexP].tasks[indexT].done = data.done || dataProjects[indexP].tasks[indexT].done;
      setProjects([...dataProjects]);
    } catch (error) {
      console.log('ERROR!', error);
    }
  }

  async function removeTask(id: string, projectId: string) {
    try {
      await deleteTask(id, projectId);

      const index = projects?.findIndex(item => item._id === projectId);
      const dataProjects = [...projects];
      dataProjects[index].tasks = dataProjects[index].tasks.filter(item => item._id !== id);
      console.log(dataProjects[index].tasks)
      setProjects([...dataProjects])
    } catch (error) {
      console.log('ERROR!', error);
    }
  }


  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    isLoading,
    fetchProjects,
    createProject,
    updateProject,
    removeProject,
    createTask,
    updateTask,
    removeTask
  };
}

