import { darkRoq } from './dark-roq';
import { lightRoq } from './light-roq';
import { samuraiRoq } from './samurai-roq';
import { ThemeInterface, createCustomTheme } from '@roq/nextjs';

export type CustomRoqTheme = ReturnType<typeof createCustomTheme>;

export const roqTheme: Record<string, CustomRoqTheme> = {
  light: lightRoq,
  dark: darkRoq,
  samurai: samuraiRoq,
};
