import React from 'react';
import { Box, Button as ChakraButton } from '@chakra-ui/react';

export const Button = ({ children, ...rest }: any) => {
  return (
    <ChakraButton
      type="button"
      bg="white"
      color="gray.700"
      border="1px"
      borderColor="gray.300"
      rounded="md"
      _hover={{ bg: 'gray.50' }}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

export const PageButton = ({ children, selected, dots, ...rest }: any) => {
  return (
    <ChakraButton
      type="button"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={selected ? 'neutral.main' : 'transparent'}
      color={selected ? 'neutral.content' : 'base.400'}
      border={selected ? '1px' : '0'}
      borderColor={selected ? 'neutral.main' : 'gray.300'}
      width="1.25rem"
      minWidth="1.25rem"
      padding={0}
      height="1.25rem"
      borderRadius="50%"
      fontSize="0.75rem"
      _hover={{ bg: dots ? 'transparent' : undefined }}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};
