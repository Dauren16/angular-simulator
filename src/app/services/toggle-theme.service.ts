import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import { BehaviorSubject, tap } from 'rxjs';
import { ThemeMode, ThemeName } from '../../enums/Theme';
import { PRESETS } from '../presets/IPRESET';

@Injectable({
  providedIn: 'root',
})
export class ToggleThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private themeModeSubject: BehaviorSubject<ThemeMode> = new BehaviorSubject(this.localStorageService.getItem<ThemeMode>('theme') ?? ThemeMode.DARK);
  private themeNameSubject: BehaviorSubject<ThemeName> = new BehaviorSubject(this.localStorageService.getItem<ThemeName>('theme-name') ?? ThemeName.AURA);

  themeMode$ = this.themeModeSubject.asObservable();
  themeName$ = this.themeNameSubject.asObservable();

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

  toggleTheme(): void {
    const currentThemeMode: ThemeMode = this.themeModeSubject.getValue();
    const next: ThemeMode = currentThemeMode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK;
    this.themeModeSubject.next(next);
  }

  setTheme(theme: ThemeName): void {
    this.themeNameSubject.next(theme);
  }
  
}
