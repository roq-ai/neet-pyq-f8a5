import { Input, InputProps, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { debounce } from 'lodash';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';

type SearchInputProp = Omit<InputProps, 'value' | 'onChange' | 'as'> & {
  type?: string;
  delay?: number;
  value: string;
  onChange: (v: string) => void;
};

export const SearchInput: FunctionComponent<SearchInputProp> = (props) => {
  const { value, onChange, delay, ...rest } = props;
  const [inputValue, setInputValue] = useState<string>(value);

  const throttledChange = useMemo(() => debounce(onChange, delay ?? 300), [onChange, delay]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value;
      setInputValue(nextValue);
      throttledChange(nextValue);
    },
    [throttledChange, setInputValue],
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => setInputValue(e.target.value), []);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(inputValue);
      throttledChange(inputValue);
    }
  }, [value, inputValue, throttledChange]);

  return (
    <InputGroup>
      <InputLeftElement height="2rem" pointerEvents="none">
        <FiSearch color="base.400" size={15} />
      </InputLeftElement>
      <Input
        height="2rem"
        type="text"
        name="search"
        placeholder="Search..."
        aria-label="Search"
        pr={3}
        pl={10}
        py={2}
        bg="base.200"
        color="base.content"
        borderRadius="4px"
        borderWidth={0}
        fontSize={'0.875rem'}
        onBlur={handleBlur}
        onChange={handleChange}
        value={inputValue}
        {...rest}
      />
    </InputGroup>
  );
};
