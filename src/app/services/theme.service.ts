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

const PRESETS: Record<Theme, Preset> = {
  [Theme.AURA]: Aura,
  [Theme.LARA]: Lara,
  [Theme.NORA]: Nora
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private themeModeSubject: BehaviorSubject<ThemeMode> = new BehaviorSubject(this.getDefaultDarkMode());
  themeMode$: Observable<ThemeMode> = this.themeModeSubject.asObservable();

  private themeNameSubject: BehaviorSubject<Theme> = new BehaviorSubject(this.getDefaultTheme());
  themeName$: Observable<Theme> = this.themeNameSubject.asObservable();

  isDarkMode$: Observable<boolean> = this.themeModeSubject.pipe(
    map((theme: ThemeMode) => theme === ThemeMode.DARK)
  )

  themeOptions: IThemeOption[] = [
    { name: 'Aura', value: Theme.AURA },
    { name: 'Lara', value: Theme.LARA },
    { name: 'Nora', value: Theme.NORA }
  ];

  constructor() {
    this.themeNameSubject.pipe(
      tap((theme: Theme) => {
          usePreset(PRESETS[theme]);
          this.localStorageService.setItem('theme-name', theme);
        }
      )
    ).subscribe();

    this.themeModeSubject.pipe(
      tap((mode: ThemeMode) => {
        document.documentElement.classList.toggle('my-app-dark', mode === ThemeMode.DARK);
        this.localStorageService.setItem('theme', mode);
        }
      )
    ).subscribe();
  }

  getDefaultDarkMode(): ThemeMode {
    return this.localStorageService.getItem<ThemeMode>('theme') ?? ThemeMode.DARK;
  }

  getDefaultTheme(): Theme {
    return this.localStorageService.getItem<Theme>('theme-name') ?? Theme.AURA;
  }

  switchDarkToLight(isDark: boolean): void {
    this.themeModeSubject.next(isDark ? ThemeMode.DARK : ThemeMode.LIGHT);
  }

  setTheme(theme: Theme): void {
    this.themeNameSubject.next(theme);
  }
  
}
