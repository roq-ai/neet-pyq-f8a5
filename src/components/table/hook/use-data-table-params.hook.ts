import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import merge from 'lodash/merge';
import omitBy from 'lodash/omitBy';
import { useCallback, useState } from 'react';

export enum OrderDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type DateType = string | null | Date;
export type DateRangeType = {
  startDate: DateType;
  endDate: DateType;
};

export interface ListDataOrderInterface<TField = string> {
  id: TField;
  desc: boolean;
}

export interface ListDataQueryFieldsInterface {
  [key: string]: boolean | ListDataQueryFieldsInterface;
}

export type ListDataFieldFilterValueType = string | string[] | number | number[] | boolean | DateRangeType;

export type ListDataFiltersType = Record<string, ListDataFieldFilterValueType>;

export interface ListDataQueryInterface {
  source: string;
  limit?: number;
  offset?: number;
  order?: ListDataOrderInterface[];
  filters?: ListDataFiltersType;
  searchTerm?: string | null;
  fields: ListDataQueryFieldsInterface;
  responseMapper?: (data: any) => any;
}

export interface DataTableParamsInterface<TOrderField = string> {
  searchTerm?: string | null;
  filters?: ListDataFiltersType;
  fieldFilters?: ListDataFiltersType;
  pageNumber?: number;
  pageSize?: number;
  order?: ListDataOrderInterface<TOrderField>[];
}

export interface UseDataTableParamsInterface<TSort = string> {
  params: DataTableParamsInterface<TSort>;
  onSearchTermChange: (search: string | null) => void;
  onFiltersChange: (filters: ListDataFiltersType | null) => void;
  onPageChange: (newPage: number, pageSize?: number) => void;
  onPageSizeChange: (rowsCount: number) => void;
  onOrderChange: (order: ListDataOrderInterface<TSort>[]) => void;
  onFieldFilterChange: (filters: ListDataFiltersType | null) => void;
  setParams?: (fn: DataTableParamsInterface<TSort>) => void;
}

const defaultParams = {
  searchTerm: '',
  filters: {},
  fieldFilters: {},
  pageNumber: 0,
  pageSize: 10,
  order: [{ id: 'created_at', desc: false }],
};

const normalizeFilters = (filters: ListDataFiltersType) => omitBy(filters, isNull);

export const useDataTableParams = (
  initialParams: Partial<DataTableParamsInterface> = defaultParams,
): UseDataTableParamsInterface => {
  const { filters, ...tableParams } = initialParams;
  const [params, _setParams] = useState<DataTableParamsInterface>(
    merge({}, defaultParams, tableParams, {
      filters: normalizeFilters(filters ?? {}),
    }),
  );

  // useState doesn't compare complex object right
  const setParams = useCallback(
    (fn: any) => {
      const nextParams = fn(params);
      const shouldUpdate = !isEqual(params, nextParams);

      if (!shouldUpdate) {
        return;
      }

      return _setParams(nextParams);
    },
    [_setParams, params],
  );

  const onOrderChange = useCallback(
    (order: ListDataOrderInterface[]) => {
      setParams((state: DataTableParamsInterface) => ({
        ...state,
        order,
      }));
    },
    [setParams],
  );

  const onPageSizeChange = useCallback(
    (pageSize: number) => {
      setParams((state: DataTableParamsInterface) => ({
        ...state,
        pageSize,
      }));
    },
    [setParams],
  );

  const onPageChange = useCallback(
    (pageNumber: number, pageSize?: number) => {
      setParams((state: DataTableParamsInterface) => ({
        ...state,
        pageNumber,
        pageSize,
      }));
    },
    [setParams],
  );

  const onSearchTermChange = useCallback(
    (search: string | null) => {
      setParams((state: DataTableParamsInterface) => ({
        ...state,
        searchTerm: search,
        pageNumber: state.searchTerm !== search ? 0 : state.pageNumber,
      }));
    },
    [setParams],
  );

  const onFiltersChange = useCallback(
    (nextFilters: ListDataFiltersType | null) => {
      setParams((state: DataTableParamsInterface) => ({
        ...state,
        filters: nextFilters ? normalizeFilters({ ...state.filters, ...nextFilters }) : {},
        pageNumber: 0,
      }));
    },

    [setParams],
  );

  const onFieldFilterChange = useCallback(
    debounce((fieldFilters: ListDataFiltersType | null): void => {
      setParams((state: DataTableParamsInterface) => ({
        ...state,
        fieldFilters,
        pageNumber: 0,
      }));
    }, 700),
    [setParams],
  );

  return {
    setParams,
    params,
    onSearchTermChange,
    onFiltersChange,
    onFieldFilterChange,
    onPageChange,
    onPageSizeChange,
    onOrderChange,
  };
};
