import React, { ReactNode } from 'react';
import { ListItem, Flex, Box, Text } from '@chakra-ui/react';

interface FormListItemProps {
  label: ReactNode;
  text: ReactNode;
}

export const FormListItem: React.FC<FormListItemProps> = ({ label, text }) => {
  return (
    <ListItem py={3}>
      <Flex>
        <Box flex="2" w="20%">
          <Text
            sx={{
              color: 'base.400',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {label}
          </Text>
        </Box>
        <Box
          flex="3"
          w="80%"
          sx={{
            color: 'base.content',
            fontSize: '1rem',
            fontWeight: 500,
          }}
        >
          {text}
        </Box>
      </Flex>
    </ListItem>
  );
};
