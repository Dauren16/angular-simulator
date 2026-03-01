import { Component } from '@angular/core';
import './collection';
import { FormsModule } from '@angular/forms';
import { IOffers } from './interfaces/IOffers';
import { ILocations } from './interfaces/ILocations';
import { IParticipants } from './interfaces/IParticipants';


@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {

  companyName: string = 'румбитет';
  selectedLocation: string = '';
  selectedParticipants: string ='';
  selectedDate: string = '';
  counter: number = 0;
  currentTimeAndDate: string = '';
  showDate: boolean = false;
  currentWidget: 'counter' | 'showDate' = 'counter';
  liveText: string = '';
  isLoading: boolean = true;

  constructor() {
    this.startClock();
    this.simulateLoading();
  }

  offers: IOffers[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'gid-icon'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'shield-icon'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'sale-ticket-icon'
    }
  ];

  locations: ILocations[] = [
    {
      id: 1,
      name: 'Almaty'
    },
    {
      id: 2,
      name: 'Astana'
    },
    {
      id: 3,
      name: 'Uralsk'
    }
  ];

  participants: IParticipants[] = [
    {
      id: 1,
      number: 2,
      title: '2 Участника'
    },
    {
      id: 2,
      number: 4,
      title: '4 Участника'
    },
    {
      id: 3,
      number: 6,
      title: '6 Участников'
    }
  ];

  counterIncrease(): void {
    this.counter++;
  }

  counterMinus(): void {
    this.counter--;
  }

  startClock(): void {
    setInterval(() => {
      this.currentTimeAndDate = new Date().toString();
    }, 1000);
  }

  toggleDate(): void {
    this.showDate = !this.showDate;
  }

  toggleWidget(): void {
    this.currentWidget = this.currentWidget === 'counter'? 'showDate' : 'counter';
  }

  simulateLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

}
