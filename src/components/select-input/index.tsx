import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Select, SelectPropsInterface } from 'components/select';
import get from 'lodash/get';
import { useCallback, useEffect, useMemo } from 'react';

interface SelectInputPropsInterface<T> {
  formik: any;
  name: string;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  selectProps?: SelectPropsInterface;
  setInitialFirst?: boolean;
}

interface SelectOnChangeValueType<T> {
  value: T[keyof T];
}

export function SelectInput<T extends { [key: string]: any }>({
  formik,
  name,
  label,
  placeholder,
  selectProps = {},
  setInitialFirst = true,
  options,
}: SelectInputPropsInterface<T>) {
  const { values, setFieldValue } = formik;

  useEffect(() => {
    if (!get(values, name) && setInitialFirst && options.length) {
      setFieldValue(name, selectProps.isMulti ? [options[0].value] : options[0].value);
    }
  }, [setInitialFirst, selectProps.isMulti, options, setFieldValue, values, name]);

  const handleChange = useCallback(
    (newValue: SelectOnChangeValueType<T> | SelectOnChangeValueType<T>[] | unknown) => {
      if (selectProps.isMulti && Array.isArray(newValue)) {
        formik.setFieldValue(
          name,
          newValue.map(({ value }) => value),
        );
      } else {
        formik.setFieldValue(name, (newValue as SelectOnChangeValueType<T>)?.value);
      }
    },
    [formik, name, selectProps.isMulti],
  );

  const optionsValue = useMemo(() => {
    const id = get(formik.values, name) ?? '';
    if (selectProps.isMulti && Array.isArray(id)) {
      return options?.filter((o) => id.includes(o.value));
    } else {
      const opt = options?.find((o) => o.value === id);
      return opt ?? '';
    }
  }, [formik, options, name, selectProps.isMulti]);

  return (
    <>
      <FormControl id={name} mb="4" isInvalid={!!get(formik.errors, name)}>
        <FormLabel>{label}</FormLabel>
        <Select
          placeholder={placeholder}
          name={name}
          value={optionsValue}
          onChange={handleChange}
          options={options}
          {...selectProps}
        />
        {get(formik.errors, name) && <FormErrorMessage>{get(formik.errors, name)}</FormErrorMessage>}
      </FormControl>
    </>
  );
}
