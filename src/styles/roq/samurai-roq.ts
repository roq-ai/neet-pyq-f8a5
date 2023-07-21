import { createCustomTheme } from '@roq/nextjs';
import { chakraTheme } from 'styles/themes';

export const samuraiRoq = createCustomTheme({
  name: 'ROQ Custom samurai Theme',
  base: {
    primary: chakraTheme.samurai.colors.primary.main,
    secondary: chakraTheme.samurai.colors.base.content,
    background: chakraTheme.samurai.colors.base[200],
    card: chakraTheme.samurai.colors.base[100],
  },
  typography: {
    family: chakraTheme.samurai.fonts.body,
  },
});
