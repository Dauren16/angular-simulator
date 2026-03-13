import { Component, inject } from '@angular/core';
import { IOffer } from '../interfaces/IOffer';
import { ILocation } from '../interfaces/ILocation';
import { IParticipant } from '../interfaces/IParticipant';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);

  selectedLocation!: string;
  selectedParticipants!: string;
  selectedDate!: string;
  liveText!: string;

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

}
