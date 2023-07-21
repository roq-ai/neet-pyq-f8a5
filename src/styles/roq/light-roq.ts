import { createCustomTheme } from '@roq/nextjs';
import { chakraTheme } from 'styles/themes';

export const lightRoq = createCustomTheme({
  name: 'ROQ Custom Light Theme',
  base: {
    primary: chakraTheme.light.colors.primary.main,
    secondary: chakraTheme.light.colors.base.content,
    background: chakraTheme.light.colors.base[200],
    card: chakraTheme.light.colors.base[100],
  },
  typography: {
    family: chakraTheme.light.fonts.body,
  },
});
