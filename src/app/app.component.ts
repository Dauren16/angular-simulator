import { Component, inject } from '@angular/core';
import './collection';
import { FormsModule } from '@angular/forms';
import { IOffer } from './interfaces/IOffer';
import { ILocation } from './interfaces/ILocation';
import { IParticipant } from './interfaces/IParticipant';
import { MessageService } from './services/message.service';
import { Message } from '../enums/Message';
import { NgTemplateOutlet } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  companyName: string = 'румтибет';
  selectedLocation!: string;
  selectedParticipants!: string;
  selectedDate!: string;
  counter: number = 0;
  currentDateTime!: string;
  showDate: boolean = false;
  currentWidget: 'counter' | 'showDate' = 'counter';
  liveText!: string;
  isLoading: boolean = true;
  message: typeof Message = Message;

  messageService: MessageService = inject(MessageService);
  storageService: LocalStorageService = inject(LocalStorageService);

  offers: IOffer[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'gid'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'shield'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'sale-ticket'
    }
  ];

  locations: ILocation[] = [
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

  participants: IParticipant[] = [
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

  constructor() {
    this.startClock();
    this.simulateLoading();
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

  simulateLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  addMessage(message: string, type: Message): void {
    this.messageService.addMessage({
      message,
      type
    });
  }
}
