import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enums/Theme';

const PRESETS: Record<Theme, Preset> = {
  [Theme.AURA]: Aura,
  [Theme.LARA]: Lara,
  [Theme.NORA]: Nora,
};

const initThemePreset = (): Preset => {
  const themeFromStorage: string | null = localStorage.getItem('theme-name');
  const savedTheme: Theme = themeFromStorage ? JSON.parse(themeFromStorage) : Theme.AURA;
  return PRESETS[savedTheme] ?? Aura;
};
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: initThemePreset(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    })
  ]
};
