import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import React, { FunctionComponent, useCallback } from 'react';

interface ToggleButtonOption<T> {
  label: string;
  value: T;
}

interface RoundedButtonToggleGroupProps<T> {
  isAttached?: boolean;
  isNullable?: true;
  options: ToggleButtonOption<T>[];
  activeOption: T | null;
  onOptionClick: (option: T | null) => void;
}

export const RoundedButtonToggleGroup = <T extends unknown>({
  options,
  activeOption,
  onOptionClick,
  isAttached,
  isNullable = true,
}: RoundedButtonToggleGroupProps<T>) => {
  const onOptionClickCB = useCallback(
    (option: T) => (isNullable && option === activeOption ? onOptionClick(null) : onOptionClick(option)),
    [onOptionClick, isNullable, activeOption],
  );
  return (
    <Box overflowX={'auto'}>
      <ButtonGroup isAttached={isAttached}>
        {options.map((option) => {
          const isActive = option.value === activeOption;
          return (
            <Button
              height={'1.75rem'}
              key={option.label}
              onClick={() => onOptionClickCB(option.value)}
              fontSize={'0.875rem'}
              fontWeight={'bold'}
              bg={isActive ? 'neutral.main' : ''}
              color={isActive ? 'neutral.content' : 'neutral.main'}
              borderRadius="full"
            >
              {option.label}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
};
