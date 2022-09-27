import { Box, Divider, Editable, EditableInput, EditablePreview, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { CreateTaskDto, IProject, UpdateProjectDto, UpdateTaskDto } from '../../models';
import { AddTaskForm } from '../AddTaskForm';
import { TaskItem } from '../TaskItem';

interface IFormProps {
  data: IProject;
  onUpdateProject: (id: string, project: UpdateProjectDto) => void;
  onDeleteProject: (id: string) => void;
  onCreateTask: (idProject: string, createTaskDto: CreateTaskDto) => void;
  onUpdateTask: (id: string, idProject: string, updateTaskDto: UpdateTaskDto) => void;
  onDeleteTask: (id: string, idProject: string) => void;
}

export function ProjectCard({
  data,
  onUpdateProject,
  onDeleteProject,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
}: IFormProps) {
  const handleUpdateProject = (value: string) => {
    onUpdateProject(data._id, { name: value });
  }
  const handleDeleteProject = () => {
    onDeleteProject(data._id);
  }

  return (
    <Box
      bg={'white'}
      boxShadow={'md'}
      rounded={'md'}
      mr={4}
    >
      <Box w={320}>
        <Flex bg={'gray.100'} p={2} roundedTop={'md'}>
          <Box flex='1'>
            <Editable
              fontSize='md'
              fontWeight={600}
              defaultValue={data.name}
              onSubmit={handleUpdateProject}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Box>
          <IconButton
            aria-label='delete'
            size='sm'
            icon={<DeleteIcon />}
            onClick={handleDeleteProject}
          />
        </Flex>

        <Box>
          <Heading as='h5' size='sm' m={2}>
            ToDo
          </Heading>
          {data?.tasks.filter(t => !t.done).map((task, i) => (
            <TaskItem
              key={i}
              data={task}
              onUpdate={(id, task) => onUpdateTask(id, data._id, task)}
              onDelete={(id) => onDeleteTask(id, data._id)}
            />
          ))}
          {!data?.tasks.filter(t => !t.done).length && (<Text p={2}>No items</Text>)}
        </Box>

        <Divider marginTop={2} />

        <Box>
          <Heading as='h5' size='sm' m={2}>
            Done
          </Heading>
          {data?.tasks.filter(t => t.done).map((task, i) => (
            <TaskItem key={i} data={task} />
          ))}
          {!data?.tasks.filter(t => t.done).length && (<Text p={2}>No items</Text>)}
        </Box>

        <Divider marginTop={2} />

        <AddTaskForm
          isLoading={false}
          onSubmit={(createTaskDto) => onCreateTask(data._id, createTaskDto)}
        />
      </Box>
    </Box>
  );
}
