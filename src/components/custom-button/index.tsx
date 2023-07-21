import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

type CustomButtonProps = ButtonProps & {
  weight: 'primary' | 'secondary';
  fullWidth?: boolean;
};

export const CustomButton: FC<CustomButtonProps> = ({ children, weight, fullWidth, ...props }) => {
  const weightToBgColorMap: Record<CustomButtonProps['weight'], string> = {
    primary: 'primary.main',
    secondary: 'neutral.transparent',
  };
  const weightToColorMap: Record<CustomButtonProps['weight'], string> = {
    primary: 'primary.content',
    secondary: 'neutral.main',
  };

  return (
    <Button
      bgColor={weightToBgColorMap[weight]}
      color={weightToColorMap[weight]}
      width={fullWidth ? '100%' : undefined}
      {...props}
    >
      {children}
    </Button>
  );
};
