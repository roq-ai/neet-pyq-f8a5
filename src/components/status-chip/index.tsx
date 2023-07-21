import { Tag } from '@chakra-ui/react';

export const StatusChip = (props: { status: string; mode: 'success' | 'info' | 'error' | 'warning' }) => {
  const { status, mode } = props;
  const baseStyles = {
    borderRadius: '25px',
    padding: '10px 10px',
    fontWeight: 'bold',
    size: 'sm',
    h: '22px',
    minW: '70px',
  };

  return mode === 'success' ? (
    <Tag color="state.success.main" bg="state.success.transparent" {...baseStyles}>
      {status}
    </Tag>
  ) : mode === 'error' ? (
    <Tag color="state.error.main" bg="state.error.transparent" {...baseStyles}>
      {status}
    </Tag>
  ) : mode === 'warning' ? (
    <Tag color="state.warning.main" bg="state.warning.transparent" {...baseStyles}>
      {status}
    </Tag>
  ) : (
    <Tag color="state.info.main" bg="state.info.transparent" {...baseStyles}>
      {status}
    </Tag>
  );
};
