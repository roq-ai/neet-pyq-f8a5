import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface TextInputComponentProps {
  id?: string;
  formControlProps?: FormControlProps;
  label?: string | ReactNode;
  error?: string | ReactNode;
  useTextarea?: boolean;
  props?: TextInputProps;
}

type TextInputProps = InputProps | TextareaProps;

export const TextInput: FC<TextInputComponentProps> = (inputProps) => {
  const { formControlProps, label, error, useTextarea = false, props } = inputProps;

  return (
    <FormControl {...formControlProps}>
      <FormLabel>{label}</FormLabel>
      {useTextarea ? (
        <Textarea
          background="base.200"
          color="base.content"
          height="auto"
          borderRadius="4px"
          border="0px"
          resize="vertical"
          {...(props as TextareaProps)}
        />
      ) : (
        <Input
          background="base.200"
          color="base.content"
          height="2.5rem"
          borderRadius="4px"
          border="0px"
          {...(props as InputProps)}
        />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
