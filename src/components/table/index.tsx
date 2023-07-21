import {
  Box,
  Spinner,
  Table as ChakraTable,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Text,
} from '@chakra-ui/react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  Updater,
  useReactTable,
} from '@tanstack/react-table';
import { Pagination } from './pagination';
import React, { ReactElement, useState, useMemo, useEffect, useCallback } from 'react';
import { SortDownIcon, SortIcon, SortUpIcon } from './table-icons';
import { DropdownIcon } from 'icons/dropdown-icon';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

type EntityWithId = { id: string };

interface TablePropsInterface<T> {
  data: T[];
  pageSize?: number;
  pageIndex?: number;
  totalCount?: number;
  columns: ColumnDef<T, unknown>[];
  onPageSizeChange?: (n: number) => void;
  onPageChange?: (newPage: number, pageSize?: number) => void;
  isLoading?: boolean;
  localPagination?: boolean;
  localSorting?: boolean;
  setParams?: (fn: unknown) => void;
  hidePagination?: boolean;
  rowClasses?: string;
  onRowClick?: (data: T) => void;
  hideTableBorders?: boolean;
  order?: SortingState;
  enableMultiSorting?: boolean;
}

const Table = <T,>({
  columns,
  totalCount,
  isLoading,
  onPageChange,
  onPageSizeChange,
  setParams,
  hidePagination,
  data = [],
  localPagination = false,
  localSorting = false,
  rowClasses,
  onRowClick,
  hideTableBorders,
  order,
  enableMultiSorting,
  ...props
}: TablePropsInterface<T>): ReactElement => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>(order || []);
  const [rowSelection, setRowSelection] = React.useState({});

  const { pageIndex, pageSize } = props;
  const setPagination: OnChangeFn<PaginationState> = useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      setParams((state: any) => {
        let updatedPagination =
          typeof updaterOrValue === 'function'
            ? updaterOrValue({
                pageSize: state.pageSize,
                pageIndex: state.pageNumber,
              })
            : updaterOrValue;
        return {
          ...state,
          pageSize: updatedPagination.pageSize,
          pageNumber: updatedPagination.pageIndex,
        };
      });
    },
    [setParams],
  );

  const pageCount = useMemo(() => Math.ceil(totalCount / pageSize), [totalCount, pageSize]);
  const state = {
    columnFilters,
    globalFilter,
    pagination: {
      pageIndex,
      pageSize,
    },
    sorting,
    rowSelection,
  };

  // Use the state and functions returned from useTable to build your UI
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state,
    manualSorting: !localSorting,
    manualPagination: !localPagination,
    manualFiltering: !localPagination,
    ...(!localPagination && {
      pageCount,
    }),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getRowId: (originalRow: any, index) => originalRow.id || index.toString(),
  });
  const cellsCount = columns?.length;

  useEffect(() => {
    if (!localPagination) {
      const fieldFilters = {};
      if (setParams) {
        setParams((state: any) => ({
          ...state,
          pageSize,
          pageNumber: pageIndex,
          fieldFilters,
          order: sorting,
        }));
      }
    }
  }, [columnFilters, globalFilter, localPagination, sorting, pageIndex, pageSize, setParams]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const pageIndex = newPage - 1;
      if (onPageChange) {
        onPageChange(pageIndex, pageSize);
      }
    },
    [onPageChange, pageSize],
  );

  const handlePageSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newSize = parseInt(event.target.value, 10);

      if (onPageSizeChange) {
        onPageSizeChange(newSize);
      }
    },
    [onPageSizeChange],
  );

  const handleRowClick = useCallback(
    (rowData: T) => {
      if (onRowClick) {
        onRowClick(rowData);
      }
    },
    [onRowClick],
  );

  const toggleColumnSort = useCallback(
    (columnId: string) => {
      setSorting((prevSorting) => {
        const existingSort = prevSorting.find((sort) => sort.id === columnId);
        if (existingSort) {
          const updatedSortDirection = existingSort.desc ? 'asc' : undefined;
          if (updatedSortDirection) {
            return prevSorting.map((sort) => (sort.id === columnId ? { ...sort, desc: false } : sort));
          } else {
            return prevSorting.filter((sort) => sort.id !== columnId);
          }
        } else {
          // incase of multiple we need to append prev but
          // currently we are supporting only one
          return [{ id: columnId, desc: true }, ...(enableMultiSorting ? [...prevSorting] : [])];
        }
      });
    },
    [enableMultiSorting],
  );

  return (
    <>
      {/* table */}
      <Box mt={4} display="flex" flexDirection="column" bg="base.100">
        <TableContainer
          overflowX="auto"
          {...(hideTableBorders
            ? {}
            : {
                borderRadius: '12px',
                border: '1px',
                borderColor: 'base.300',
                px: 3,
              })}
        >
          <ChakraTable size="sm" variant="simple" px="0.75rem" py="0.5rem">
            <Thead>
              {table.getHeaderGroups().map((headerGroup, i) => (
                <Tr key={`tr-${i}`}>
                  {headerGroup.headers.map((header, i) => (
                    <Th
                      key={i}
                      scope="col"
                      px={4}
                      py={3}
                      textAlign="left"
                      fontSize="0.75rem"
                      fontWeight="bold"
                      color="base.content"
                      letterSpacing="wider"
                      height={'2.75rem'}
                      opacity={0.6}
                      style={{
                        ...(header.column.getCanResize() && {
                          minWidth: header.column.columnDef.minSize,
                          maxWidth: header.column.columnDef.maxSize,
                        }),
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.columnDef.enableSorting ? (
                          <Box ml={2} cursor={'pointer'} onClick={() => toggleColumnSort(header.column.columnDef.id)}>
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === 'desc' ? (
                                <SortDownIcon width="15px" height="15px" color={'base.content'} />
                              ) : (
                                <SortUpIcon width="15px" height="15px" color={'base.content'} />
                              )
                            ) : (
                              <>
                                <SortIcon width="15px" height="15px" color={'base.content'} style={{ opacity: 0.5 }} />
                              </>
                            )}
                          </Box>
                        ) : null}
                      </Box>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td colSpan={cellsCount} textAlign="center" py={4}>
                    <Box display="flex" justifyContent="center">
                      <Spinner size="sm" color="blue.600" mr={2} />
                    </Box>
                  </Td>
                </Tr>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, i) => (
                  <Tr
                    key={`${row.id}-${i}`}
                    height="3.5rem"
                    textAlign="left"
                    onClick={() => handleRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell, j) => (
                      <Td
                        key={`${cell.id}-${i}-${j}`}
                        padding="0.5rem 1rem"
                        fontSize="0.875rem"
                        color="base.content"
                        style={{
                          ...(cell.column.getCanResize() && {
                            minWidth: cell.column.columnDef.minSize,
                            maxWidth: cell.column.columnDef.maxSize,
                            whiteSpace: 'pre-wrap',
                          }),
                        }}
                        borderBottom={i === table.getRowModel().rows.length - 1 ? 'none' : undefined}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    ))}
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={cellsCount} textAlign="center" py={4}>
                    No Records
                  </Td>
                </Tr>
              )}
            </Tbody>
          </ChakraTable>
        </TableContainer>
      </Box>
      {/* Pagination */}
      {!hidePagination && (
        <Box
          py={3}
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="unset"
          justifyContent="flex-start"
        >
          <Box display="flex" gap="2">
            <Box display="flex" alignItems="center">
              <Text opacity={0.6} mr={2} color="neutral.main" fontSize="0.875rem">
                Items Per Page:
              </Text>
              <Select
                width="60px"
                height="2rem"
                borderColor="base.300"
                boxShadow="none"
                size="xs"
                borderRadius="4px"
                maxWidth="xs"
                value={state.pagination.pageSize}
                onChange={handlePageSizeChange}
                icon={<DropdownIcon />}
                iconColor="base.400"
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            mt={{ base: 2, md: 0 }}
            flexGrow={1}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box opacity={0.6} display="flex" gap={2} alignItems="baseline" fontSize="0.875rem" pt={1}>
              <Box fontSize="base" color="neutral.main" pl={{ base: 0, md: 2 }}>
                <Box as="span">{table.getState().pagination.pageIndex * state.pagination.pageSize + 1}</Box>
                {'-'}
                <Box as="span">
                  {table.getState().pagination.pageIndex * state.pagination.pageSize + table.getRowModel().rows.length}
                </Box>
                {' of '}
                <Box as="span">{totalCount} items</Box>
              </Box>
            </Box>
            <Pagination
              currentPage={table.getState().pagination.pageIndex + 1}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={handlePageChange}
              siblingCount={2}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Table;
