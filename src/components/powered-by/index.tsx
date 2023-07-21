import { Box, Text } from '@chakra-ui/react';
import { LogoIcon } from 'icons/logo-icon';
import { FC } from 'react';
export const PoweredBy: FC<{}> = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Text color="base.content" opacity="0.6" mr="6px">
        powered by
      </Text>
      <LogoIcon fill="base.content" width="36px" height="36px" opacity="0.6" />
    </Box>
  );
};
