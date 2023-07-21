import AppLayout from 'layout/app-layout';
import { Box, Text, Flex, TextProps } from '@chakra-ui/react';
import useSWR from 'swr';
import { getUsers } from 'apiSdk/users';
import { UserInterface } from 'interfaces/user';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { useRouter } from 'next/router';
import { SearchInput } from 'components/search-input';
import Table from 'components/table';
import { useCallback } from 'react';
import { ListDataFiltersType, useDataTableParams } from 'components/table/hook/use-data-table-params.hook';
import { compose } from 'lib/compose';
import { PaginatedInterface } from 'interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { withAppLayout } from 'lib/hocs/with-app-layout.hoc';
import { AccessInfo } from 'components/access-info';

type ColumnType = ColumnDef<UserInterface, unknown>;

interface UserListPageProps {
  filters?: ListDataFiltersType;
  pageSize?: number;
  hidePagination?: boolean;
  showSearchFilter?: boolean;
  titleProps?: TextProps;
  hideTableBorders?: boolean;
}

function UserListPage(props: UserListPageProps) {
  const { showSearchFilter, titleProps = {}, hidePagination, hideTableBorders, pageSize } = props;
  const { onSearchTermChange, params, onPageChange, onPageSizeChange, setParams } = useDataTableParams({
    filters: {},
    searchTerm: '',
    order: [
      {
        desc: true,
        id: 'created_at',
      },
    ],
    pageSize,
  });

  const fetcher = useCallback(
    async () => getUsers(),
    [params.pageSize, params.pageNumber, params.searchTerm, params.order],
  );

  const { data, error, isLoading } = useSWR<PaginatedInterface<UserInterface>>(
    () => `/users?params=${JSON.stringify(params)}`,
    fetcher,
  );

  const router = useRouter();
  const columns: ColumnType[] = [
    { id: 'email', header: 'email', accessorKey: 'email' },
    { id: 'firstName', header: 'firstName', accessorKey: 'firstName' },
    { id: 'lastName', header: 'lastName', accessorKey: 'lastName' },
  ];
  const handleView = (data: UserInterface) => {
    router.push(`/users/view/${data.id}`);
  };
  return (
    <Box p={4} rounded="md" shadow="none">
      <AccessInfo entity="user" />
      <Flex justifyContent="space-between" mb={4}>
        <Text as="h1" fontSize="1.875rem" fontWeight="bold" color="base.content" {...titleProps}>
          Users
        </Text>
      </Flex>
      {showSearchFilter && (
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'flex-start', md: 'space-between' }}
          mb={4}
          gap={{ base: 2, md: 0 }}
        >
          <Box></Box>
          <Box>
            <SearchInput value={params.searchTerm} onChange={onSearchTermChange} />
          </Box>
        </Flex>
      )}
      {error && (
        <Box mb={4}>
          <Error error={error} />
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
export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'user',
    operation: AccessOperationEnum.READ,
  }),
  withAppLayout(),
)(UserListPage);
