import { Box, Center, Checkbox, Editable, EditableInput, EditablePreview, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { ITask } from '../../models';

interface IFormProps {
  data: ITask;
}

export function TaskItem({
  data,
}: IFormProps) {
  return (
    <Flex paddingInline={2} paddingBlock={1}>
      <Center marginRight={2}>
        <Checkbox size='lg'></Checkbox>
      </Center>
      <Box flex='1'>
        <Editable defaultValue={data.name}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Box>
      <Box>
        <IconButton aria-label='delete' size='sm' icon={<DeleteIcon />} />
      </Box>
    </Flex>
  );
}
