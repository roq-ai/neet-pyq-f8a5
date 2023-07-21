import { Box, Image, Text } from '@chakra-ui/react';
import { FC, ReactNode, useMemo } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" h={{ lg: '100vh' }} bg="base.100">
      <Box flex="0 0 auto" display={{ lg: 'flex' }} height={{ lg: '100vh' }}>
        {children}
      </Box>
    </Box>
  );
}
