import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ThemeMode, Theme } from '../../enums/Theme';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { IThemeOption } from '../interfaces/IThemeState';
import { Preset } from '@primeuix/themes/types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private isDarkModeSubject: BehaviorSubject<ThemeMode> = new BehaviorSubject(this.getInitialDarkMode());
  isDarkMode$: Observable<ThemeMode> = this.isDarkModeSubject.asObservable();

  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject(this.getInitialTheme());
  theme$: Observable<Theme> = this.themeSubject.asObservable();

  isDark$: Observable<boolean> = this.isDarkModeSubject.pipe(
    map((theme: ThemeMode) => theme === ThemeMode.DARK)
  )

  themeOptions: IThemeOption[] = [
    { name: 'Aura', value: Theme.AURA },
    { name: 'Lara', value: Theme.LARA },
    { name: 'Nora', value: Theme.NORA }
  ];

  presets: Record<Theme, Preset> = {
    [Theme.AURA]: Aura,
    [Theme.LARA]: Lara,
    [Theme.NORA]: Nora
  };

  constructor() {
    this.themeSubject.pipe(
      tap((theme: Theme) => {
          usePreset(this.presets[theme]);
          this.localStorageService.setItem('theme-name', theme);
        }
      )
    ).subscribe();

    this.isDarkModeSubject.pipe(
      tap((mode: ThemeMode) => {
        document.documentElement.classList.toggle('my-app-dark', mode === ThemeMode.DARK);
        this.localStorageService.setItem('theme', mode);
        }
      )
    ).subscribe();
  }

  getInitialDarkMode(): ThemeMode {
    return this.localStorageService.getItem<ThemeMode>('theme') ?? ThemeMode.DARK;
  }

  getInitialTheme(): Theme {
    return this.localStorageService.getItem<Theme>('theme-name') ?? Theme.AURA;
  }

  toggleDarkMode(isDark: boolean): void {
    this.isDarkModeSubject.next(isDark ? ThemeMode.DARK : ThemeMode.LIGHT);
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
  }
  
}
