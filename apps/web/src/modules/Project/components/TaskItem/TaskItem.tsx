import { Box, Center, Checkbox, Editable, EditableInput, EditablePreview, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { ITask, UpdateTaskDto } from '../../models';

interface IFormProps {
  data: ITask;
  onUpdate?: (id: string, project: UpdateTaskDto) => void;
  onDelete?: (id: string) => void;
}

export function TaskItem({
  data,
  onUpdate,
  onDelete,
}: IFormProps) {
  const handleUpdate = ({ name, done}: any) => {
    onUpdate && onUpdate(data._id, { name, done });
  }
  const handleDelete = () => {
    onDelete && onDelete(data._id);
  }

  return (
    <Flex paddingInline={2} paddingBlock={1}>
      <Center marginRight={2}>
        <Checkbox
          isDisabled={data.done}
          isChecked={data.done}
          onChange={(e) => handleUpdate({ done: e.target.checked })}
          size='lg'
        />
      </Center>
      <Box flex='1'>
        <Editable
          isDisabled={data.done}
          defaultValue={data.name}
          onSubmit={(name) => handleUpdate({ name })}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Box>
      <Box>
        <IconButton
          aria-label='delete'
          size='sm'
          icon={<DeleteIcon />}
          onClick={handleDelete}
          hidden={data.done}
        />
      </Box>
    </Flex>
  );
}
