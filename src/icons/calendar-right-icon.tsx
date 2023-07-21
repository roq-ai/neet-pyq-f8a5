import { Icon, IconProps } from '@chakra-ui/react';

export const CalendarRightIcon = ({ bg, color, ...props }: IconProps & { bg: string; color: string }) => (
  <Icon width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="32" height="32" rx="4" fill={bg} />
    <path d="M13.333 22.6663L19.9997 15.9997L13.333 9.33301V22.6663Z" fill={color} />
  </Icon>
);
