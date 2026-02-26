import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import './collection';
import { IOffer } from './interfaces/IOffer';
import { FormsModule } from '@angular/forms';
import { ILocation } from './interfaces/ILocations';
import { IParticipant } from './interfaces/IParticipants';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {

  companyName: string = "румтибет";
  selectedLocation: string = '';
  selectedDate: string = '';
  selectedParticipants: string = '';
  currentTimeAndDate: string = new Date().toString();
  counter: number = 0;
  currentWidget:  'counter' | 'timeAndDate' = 'counter';
  liveText: string = '';
  isLoading: boolean = true;

  constructor() {
    this.saveDateToLocalStorage();
    this.saveSessions();
    this.isPrimaryColor(Color.BLUE);
    this.showСurrentTimeAndDate();
    this.finishLoading();
  }

  isPrimaryColor(color: Color): boolean {
    return [Color.RED, Color.GREEN, Color.BLUE].includes(color);
  }

  saveDateToLocalStorage(): void {
    localStorage.setItem('date-last-entry', new Date().toString())
  }

  saveLastVisitDate(): void {
    localStorage.setItem('visiting-time', new Date().toString())
  }

  saveSessions(): void {
    const visits: string | null = localStorage.getItem('visit-counter');
    let visitCount: number;
    if (visits === null) {
      visitCount = 1;
    } else {
      visitCount = Number(visits) + 1;
    }
    localStorage.setItem('visit-counter', visitCount.toString());
  }

  showСurrentTimeAndDate(): void {
    setInterval(() => {
      this.currentTimeAndDate = new Date().toLocaleString();
    }, 1000);
  }

  increaseCounter(): void {
    this.counter++;
  }

  reduceCounter(): void {
    this.counter--;
  }

  switchWidget(widget: 'counter' | 'timeAndDate'): void {
    this.currentWidget = widget;
  }

  finishLoading(): void {
    setTimeout(() => {
     this.isLoading = false;
    }, 3000);
  }

  offers: IOffer[] = [
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
      image: 'cost-ticket-icon'
    },
  ]

  locations: ILocation[] = [
    {
      id: 1,
      value: 'Astana',
      location: 'Астана'
    },
    {
      id: 2,
      value: 'Almaty',
      location: 'Алматы'
    },
    {
      id: 3,
      value: 'Uralsk',
      location: 'Уральск'
    },
    {
      id: 4,
      value: 'Samara',
      location: 'Самара'
    }
  ]

  participants: IParticipant[] = [
    {
      id: 1,
      quantity: 4,
      value: 'four'
    },
    {
      id: 2,
      quantity: 3,
      value: 'three'
    },
    {
      id: 3,
      quantity: 2,
      value: 'two'
    },
    {
      id: 4,
      quantity: 1,
      value: 'one'
    }
  ]
}
