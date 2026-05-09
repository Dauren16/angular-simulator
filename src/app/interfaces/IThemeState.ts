import { Theme, ThemeMode } from "../../enums/Theme";

export interface IThemeState {
  theme: Theme;
  themeMode: ThemeMode;
}

export interface IThemeOption {
  name: string;
  value: Theme;
}