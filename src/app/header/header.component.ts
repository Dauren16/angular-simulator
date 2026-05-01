import { Component, inject } from '@angular/core';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { ToggleThemeService } from '../services/toggle-theme.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeName } from '../../enums/Theme';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule, FontAwesomeModule, ToggleSwitchModule, ButtonModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  toggleThemeService: ToggleThemeService = inject(ToggleThemeService);

  companyName: string = 'румтибет';
  showDate: boolean = false;
  counter: number = 0;
  currentWidget: 'counter' | 'showDate' = 'counter';
  currentDateTime!: string;

  themeOptions: { name: string; value: ThemeName; }[] = [
    { name: 'Aura', value: ThemeName.AURA },
    { name: 'Lara', value: ThemeName.LARA },
    { name: 'Nora', value: ThemeName.NORA }
  ];
  selectedTheme$: Observable<ThemeName> = this.toggleThemeService.themeName$;

  navigation: INavigation[] = [
    {
      id: 1,
      value: 'Главная',
      path: '/'
    },
    {
      id: 2,
      value: 'Пользователи',
      path: 'users-page'
    }
  ];

  constructor() {
    this.startClock();
  }

  increaseCounter(): void {
    this.counter++;
  }

  decreaseCounter(): void {
    this.counter--;
  }

  startClock(): void {
    setInterval(() => {
      this.currentDateTime = new Date().toString();
    }, 1000);
  }

  setWidget(widget: 'counter' | 'showDate'): void {
    this.currentWidget = widget;
  }

  onThemeChange(theme: ThemeName): void {
    this.toggleThemeService.setTheme(theme);
  }

}
