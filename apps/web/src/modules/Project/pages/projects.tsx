import { Flex,Skeleton, Stack } from '@chakra-ui/react';
import { AddProjectForm } from '@src/modules/Project/components';
import { useProduct } from '../hooks';
import { ProjectCard } from '../components/ProjectCard';
import { CreateProjectDto, CreateTaskDto, UpdateProjectDto, UpdateTaskDto } from '../models';

export function Projects() {
  const {
    projects,
    isLoading,
    createProject,
    updateProject,
    removeProject,
    createTask,
    updateTask,
    removeTask
  } = useProduct();

  const handleCreateProject = (createProjectDto: CreateProjectDto) => {
    createProject(createProjectDto);
  }
  const handleUpdateProject = (id: string, updateProjectDto: UpdateProjectDto) => {
    updateProject(id, updateProjectDto);
  }
  const handleRemoveProject = (id: string) => {
    removeProject(id);
  }

  const handleCreateTask = (idProject: string, createTaskDto: CreateTaskDto) => {
    createTask(idProject, createTaskDto);
  }
  const handleUpdateTask = (id: string, idProject: string, updateTaskDto: UpdateTaskDto) => {
    updateTask(id, idProject, updateTaskDto);
  }
  const handleRemoveTask = (id: string, idProject: string) => {
    removeTask(id, idProject);
  }

  return (
    <Flex p={4} alignItems={'flex-start'} overflowY={'auto'}>
      {projects.map((project, i) => (
        <ProjectCard
          key={i}
          data={project}
          onUpdateProject={handleUpdateProject}
          onDeleteProject={handleRemoveProject}
          onCreateTask={handleCreateTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleRemoveTask}
        />
      ))}

      {isLoading && (
        <Stack flex={1} marginInline={2}>
          <Skeleton height='30px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='40px' />
        </Stack>
      )}

      <AddProjectForm
        isLoading={false}
        onSubmit={handleCreateProject}
      />
    </Flex>
  );

}
