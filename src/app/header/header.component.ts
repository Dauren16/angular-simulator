import { Component, inject } from '@angular/core';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../services/theme.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Theme } from '../../enums/Theme';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule, FontAwesomeModule, ToggleSwitchModule, ButtonModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);

  companyName: string = 'румтибет';
  showDate: boolean = false;
  counter: number = 0;
  currentWidget: 'counter' | 'showDate' = 'counter';
  currentDateTime!: string;

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

  onThemeChange(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  toggleDarkMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked);
  }

}
