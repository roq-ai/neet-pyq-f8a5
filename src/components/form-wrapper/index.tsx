import { Box, BoxProps } from '@chakra-ui/react';
import { FC, FormEventHandler, ReactNode } from 'react';

interface FormWrapperProps {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  wrapperProps?: BoxProps;
}

const Wrapper: FC<{ children: ReactNode; wrapperProps?: BoxProps }> = ({ children, wrapperProps }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="1.125rem"
      gap="1.25rem"
      alignItems="flex-start"
      maxW={'520px'}
      borderRadius={'10px'}
      border="1px"
      borderColor={'base.300'}
      {...wrapperProps}
    >
      {children}
    </Box>
  );
};

export const FormWrapper: FC<FormWrapperProps> = ({ children, onSubmit, wrapperProps }) => {
  return onSubmit ? (
    <form onSubmit={onSubmit}>
      <Wrapper wrapperProps={wrapperProps}>{children}</Wrapper>
    </form>
  ) : (
    <Wrapper wrapperProps={wrapperProps}>{children}</Wrapper>
  );
};
