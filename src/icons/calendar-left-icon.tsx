import { Icon, IconProps } from '@chakra-ui/react';

export const CalendarLeftIcon = ({ bg, color, ...props }: IconProps & { bg: string; color: string }) => (
  <Icon width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="32" height="32" rx="4" fill={bg} />
    <path d="M18.6667 9.33301L12 15.9997L18.6667 22.6663V9.33301Z" fill={color} />
  </Icon>
);
