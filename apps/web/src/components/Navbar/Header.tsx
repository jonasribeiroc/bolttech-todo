import {
  Box,
  Flex,
  Image,
  Link,
  useColorModeValue,
  Text,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { imagens } from '@src/utils';
import { useAuth } from '@src/modules/Auth/hooks';

export function Header({ ...props }) {
  const { user, logout } = useAuth();
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bg} w="full" px={6} py={4} shadow="md" {...props}>
      <Flex align="center" justify="space-between">
        <Link as={RouterLink} to="/dashboard" href="/" title="Bolttech ToDo">
          <Image
            src={imagens.LOGO}
            alt="Bolttech ToDo"
            maxW={90}
          />
        </Link>
        <Menu isLazy>
          <MenuButton>
            <Text> Olá, {user.name}</Text>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => logout()}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}
