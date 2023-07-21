import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface NumberInputComponentProps extends NumberInputProps {
  id?: string;
  formControlProps?: FormControlProps;
  label?: string | ReactNode;
  error?: string | ReactNode;
}

export const NumberInput: FC<NumberInputComponentProps> = (inputProps) => {
  const { formControlProps, label, error, ...props } = inputProps;
  return (
    <FormControl {...formControlProps}>
      <FormLabel>{label}</FormLabel>
      <ChakraNumberInput
        background="base.200"
        color="base.content"
        height="2.5rem"
        borderRadius="4px"
        border="0px"
        {...props}
      >
        <NumberInputField borderRadius="4px" border="0px" />
        <NumberInputStepper>
          <NumberIncrementStepper sx={{ border: '0px' }} color="base.400" />
          <NumberDecrementStepper sx={{ border: '0px' }} color="base.400" />
        </NumberInputStepper>
      </ChakraNumberInput>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
