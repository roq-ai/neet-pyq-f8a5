import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { Error } from '../error';
import get from 'lodash/get';
import { Select, SelectPropsInterface } from 'components/select';
import { PaginatedInterface } from 'interfaces';

interface AsyncSelectPropsInterface<T> {
  formik: any;
  name: string;
  label: string;
  placeholder: string;
  fetcher: () => Promise<PaginatedInterface<T>>;
  renderOption?: (record: T) => string;
  valueField?: string;
  labelField?: string;
  selectProps?: SelectPropsInterface;
  setInitialFirst?: boolean;
}

interface SelectOnChangeValueType<T> {
  value: T[keyof T];
}

type FetchedDataType<T> = { data: T[] };

export function AsyncSelect<T extends { [key: string]: any }>({
  formik,
  name,
  label,
  placeholder,
  fetcher,
  renderOption,
  valueField = 'id',
  labelField = 'name',
  selectProps = {},
  setInitialFirst = true,
}: AsyncSelectPropsInterface<T>) {
  const { data, error, isLoading } = useSWR<T[] | FetchedDataType<T>>(name, () => fetcher().then(({ data }) => data));
  const fetchedData = useMemo(() => {
    if (Array.isArray((data as FetchedDataType<T>)?.data)) {
      return (data as FetchedDataType<T>)?.data as T[];
    }
    return data as T[];
  }, [data]);

  useEffect(() => {
    if (formik.values && fetchedData && fetchedData.length === 1 && !get(formik.values, name) && setInitialFirst) {
      formik.setFieldValue(name, selectProps.isMulti ? [fetchedData[0][valueField]] : fetchedData[0][valueField]);
    }
  }, [fetchedData, setInitialFirst, selectProps.isMulti]);

  const options = useMemo(() => {
    return fetchedData?.map((record) => ({
      value: get(record, valueField),
      label: renderOption?.(record) || get(record, labelField),
    }));
  }, [fetchedData, labelField, valueField, renderOption]);

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
      {error && <Error error={error} />}
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
