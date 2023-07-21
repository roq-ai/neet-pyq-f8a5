import { Flex, Text, Box } from '@chakra-ui/react';
import { InfoIcon } from 'icons/info-icon';
import { useAccessInfo } from 'lib/hooks/use-access-info-text';

interface AccessInfoProps {
  entity: string;
}
export const AccessInfo = (props: AccessInfoProps) => {
  const text = useAccessInfo(props.entity);
  return (
    <Flex bg="state.info.transparent" borderRadius="md" p={2} alignItems="center" mb={4}>
      <Box color="state.info.main" mr={1}>
        <InfoIcon width="24px" height="24px" />
      </Box>
      <Text color="base.content" fontSize="sm">
        {text}
      </Text>
    </Flex>
  );
};
