import { createCustomTheme } from '@roq/nextjs';
import { chakraTheme } from 'styles/themes';

export const darkRoq = createCustomTheme({
  name: 'ROQ Custom dark Theme',
  base: {
    primary: chakraTheme.dark.colors.primary.main,
    secondary: chakraTheme.dark.colors.base.content,
    background: chakraTheme.dark.colors.base[200],
    card: chakraTheme.dark.colors.base[100],
  },
  typography: {
    family: chakraTheme.dark.fonts.body,
  },
});
