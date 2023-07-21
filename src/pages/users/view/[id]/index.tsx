import AppLayout from 'layout/app-layout';
import React from 'react';
import NextLink from 'next/link';
import { Text, Box, Spinner, Link, Stack, Flex, Center, List } from '@chakra-ui/react';
import { getUserById } from 'apiSdk/users';
import { Error } from 'components/error';
import { UserInterface } from 'interfaces/user';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import Breadcrumbs from 'components/breadcrumb';
import { FormWrapper } from 'components/form-wrapper';
import { FormListItem } from 'components/form-list-item';
import { compose } from 'lib/compose';

function UserViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading } = useSWR<UserInterface>(
    () => (id ? `/users/${id}` : null),
    () => getUserById(id),
  );
  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Users',
              link: '/users',
            },
            {
              label: 'User Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper>
              <Stack direction="column" spacing={2} mb={4}>
                <Text
                  sx={{
                    fontSize: '1.875rem',
                    fontWeight: 700,
                    color: 'base.content',
                  }}
                >
                  Menu Item Details
                </Text>
              </Stack>
              <List spacing={3} w="100%">
                <FormListItem label="Email:" text={data?.email} />

                <FormListItem label="First Name:" text={data?.firstName} />

                <FormListItem label="First Name:" text={data?.lastName} />

                <FormListItem
                  label="Created At:"
                  text={format(parseISO(data?.created_at as unknown as string), 'dd-MM-yyyy')}
                />

                <FormListItem
                  label="Updated At:"
                  text={format(parseISO(data?.updated_at as unknown as string), 'dd-MM-yyyy')}
                />
              </List>
            </FormWrapper>
          </>
        )}
      </Box>
    </AppLayout>
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
)(UserViewPage);
