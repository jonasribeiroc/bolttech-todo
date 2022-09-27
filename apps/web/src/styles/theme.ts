import { extendTheme } from '@chakra-ui/react';
import { lighten } from 'polished';

export const Button = {
  variants: {
    ghost: {
      color: 'primary',
      colorScheme: 'linkedin',
      _hover: {
        color: lighten(1, '#170f4f'),
        bg: 'none',
      },
      _active: {
        bg: 'none',
      },
    },
  },
};

export const theme = extendTheme({
  colors: {
    primary: '#170f4f',
    secondary: '#14bdca',
  },
  components: {
    Button,
  },
});
