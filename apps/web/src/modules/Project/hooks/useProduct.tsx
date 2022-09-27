import { useEffect, useState } from 'react';
import { CreateProjectDto, CreateTaskDto, IProject, UpdateProjectDto, UpdateTaskDto } from '@src/modules/Project/models';
import { getProjects, postProject, putProject, deleteProject, postTask, putTask, deleteTask } from '@src/modules/Project/api';
import { useToast } from '@chakra-ui/react';

export function useProduct() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast()

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
      setProjects([...projects, project]);
      toast({ title: 'Project created.', status: 'success' });
    } catch (error) {
      console.log('ERROR!', error);
    }
  }

  async function updateProject(id: string, data: UpdateProjectDto) {
    try {
      await putProject(id, data);
      toast({ title: 'Project updated.', status: 'success' });
    } catch (error) {
      console.log('ERROR!', error);
    }
  }

  async function removeProject(id: string) {
    try {
      await deleteProject(id);
      const dataProjects = projects?.filter(item => item._id !== id);
      setProjects(dataProjects);
      toast({ title: 'Project removed.', status: 'success' });
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
      toast({ title: 'Task created.', status: 'success' });
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
      toast({ title: 'Task updated.', status: 'success' });
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
      setProjects([...dataProjects]);
      toast({ title: 'Task removed.', status: 'success' });
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

