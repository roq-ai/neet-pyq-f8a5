import { extendTheme } from '@chakra-ui/react';
import { colors } from './foundations/colors';
import { config } from './foundations/config';
import { fonts } from './foundations/fonts';

export const light = extendTheme({
  config,
  colors,
  fonts,
});
