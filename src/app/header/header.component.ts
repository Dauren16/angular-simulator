import { Component } from '@angular/core';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

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

}
