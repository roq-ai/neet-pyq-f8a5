import { Box, Text, Flex, TextProps, Button, IconButton } from '@chakra-ui/react';
import useSWR from 'swr';
import { getUsers } from 'apiSdk/users';
import { UserInterface } from 'interfaces/user';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi } from '@roq/nextjs';
import { useRouter } from 'next/router';
import { SearchInput } from 'components/search-input';
import Table from 'components/table';
import { useCallback, useState } from 'react';
import { ListDataFiltersType, useDataTableParams } from 'components/table/hook/use-data-table-params.hook';
import { PaginatedInterface } from 'interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { useFormik } from 'formik';
import { AsyncSelect } from 'components/async-select';

type RoledUser = {
  id: string;
  user: UserInterface;
} & Record<string, any>;

type ColumnType = ColumnDef<RoledUser, unknown>;

interface UserPageTableProps {
  fetcher: any;
  deleteHandler: any;
  createHandler: any;
  entity: string;
  filters?: ListDataFiltersType;
  title: string;
  pageSize?: number;
  hidePagination?: boolean;
  showSearchFilter?: boolean;
  titleProps?: TextProps;
  hideTableBorders?: boolean;
  columns?: ColumnType[];
}
export function UserPageTable(props: UserPageTableProps) {
  const {
    fetcher: dataFetcher,
    deleteHandler,
    createHandler,
    entity,
    filters,
    title,
    titleProps = {},
    showSearchFilter = false,
    hidePagination,
    hideTableBorders,
    columns: columnProps = [],
  } = props;
  const { hasAccess } = useAuthorizationApi();

  const { onSearchTermChange, params, onPageChange, onPageSizeChange, setParams } = useDataTableParams({
    filters,
    searchTerm: '',
    order: [
      {
        desc: true,
        id: 'created_at',
      },
    ],
  });

  const fetcher = useCallback(
    async () =>
      dataFetcher({
        relations: ['user'],
        limit: params.pageSize,
        offset: params.pageNumber * params.pageSize,
        searchTerm: params.searchTerm,
        order: params.order,
        ...(params.filters || {}),
      }),
    [params.pageSize, params.pageNumber, params.searchTerm, params.order, dataFetcher],
  );

  const { data, error, isLoading, mutate } = useSWR<PaginatedInterface<RoledUser>>(() => `${entity}`, fetcher);

  const onDelete = async (id: string) => {
    await deleteHandler(id);
    mutate();
  };
  const router = useRouter();
  const columns: ColumnType[] = [
    { id: 'email', header: 'email', accessorKey: 'user.email' },
    ...columnProps,
    {
      id: 'actions',
      header: 'actions',
      accessorKey: 'actions',
      maxSize: 1,
      cell: ({ row: { original: record } }: any) => (
        <Flex justifyContent="flex-end">
          {hasAccess(entity, AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(record.id);
              }}
              padding="0rem 0.5rem"
              variant="outline"
              aria-label="edit"
              height="1.5rem"
              fontSize="0.75rem"
              color="state.error.main"
              borderRadius="6px"
              borderColor="state.error.transparent"
              icon={<FiTrash width="12px" height="12px" color="error.main" />}
            />
          )}
        </Flex>
      ),
    },
  ];
  const [deleteError, setDeleteError] = useState(null);
  const formik = useFormik({
    initialValues: {
      user_id: '',
    },
    onSubmit: async (formValues, { resetForm }) => {
      try {
        await createHandler({ ...formValues, ...filters });
        mutate();
        resetForm();
      } catch (err) {
        setDeleteError(err);
      }
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleView = (data: RoledUser) => {
    router.push(`/users/view/${data.user.id}`);
  };

  return (
    <Box p={4} rounded="md" shadow="none">
      <Flex justifyContent="space-between" mb={4}>
        <Text as="h1" fontSize="1.875rem" fontWeight="bold" color="base.content" {...titleProps}>
          {title}
        </Text>
      </Flex>
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
        mb={4}
        gap={{ base: 2, md: 0 }}
      >
        {showSearchFilter && (
          <Box>
            <SearchInput value={params.searchTerm} onChange={onSearchTermChange} />
          </Box>
        )}
      </Flex>
      {hasAccess(entity, AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT) && (
        <Flex
          maxW="md"
          flexDirection={{ base: 'column', md: 'row' }}
          gap={{ base: 2, md: 4 }}
          alignItems={{ md: 'center' }}
        >
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'id'}
          />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              formik.handleSubmit();
            }}
            isDisabled={!Boolean(formik.values.user_id)}
            height={'2rem'}
            mt={{ md: '4' }}
            padding="0rem 0.75rem"
            fontSize={'0.875rem'}
            fontWeight={600}
            bg="primary.main"
            borderRadius={'6px'}
            color="primary.content"
            _hover={{
              bg: 'primary.focus',
            }}
            mr="4"
            as="a"
          >
            <FiPlus size={16} color="primary.content" style={{ marginRight: '0.25rem' }} />
            Create
          </Button>
        </Flex>
      )}

      {error && (
        <Box mb={4}>
          <Error error={error} />
        </Box>
      )}
      {deleteError && (
        <Box mb={4}>
          <Error error={deleteError} />{' '}
        </Box>
      )}
      <>
        <Table
          hidePagination={hidePagination}
          hideTableBorders={hideTableBorders}
          isLoading={isLoading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          columns={columns}
          data={data?.data}
          totalCount={data?.totalCount || 0}
          pageSize={params.pageSize}
          pageIndex={params.pageNumber}
          order={params.order}
          setParams={setParams}
          onRowClick={handleView}
        />
      </>
    </Box>
  );
}
