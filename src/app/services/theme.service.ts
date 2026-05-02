import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ThemeMode, Theme } from '../../enums/Theme';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

const PRESETS = {
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

  isDarkMode$ = this.themeModeSubject.pipe(
    map((theme: ThemeMode) => theme === ThemeMode.DARK)
  )

  constructor() {
    this.themeNameSubject.pipe(
      tap(theme => {
          usePreset(PRESETS[theme]);
          this.localStorageService.setItem('theme-name', theme);
        }
      )
    ).subscribe();

    this.themeModeSubject.pipe(
      tap(mode => {
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

  toggleTheme(): void {
    const currentThemeMode: ThemeMode = this.themeModeSubject.getValue();
    const next: ThemeMode = currentThemeMode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK;
    this.themeModeSubject.next(next);
  }

  setTheme(theme: Theme): void {
    this.themeNameSubject.next(theme);
  }
  
}
