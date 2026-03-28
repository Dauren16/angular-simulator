import { Component, inject } from '@angular/core';
import { Message } from '../../enums/Message';
import { MessageService } from '../services/message.service';
import { NgTemplateOutlet } from '@angular/common';
import { IMessage } from '../interfaces/IMessage';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  private messageService: MessageService = inject(MessageService);
  message: typeof Message = Message;
  messages$: Observable<IMessage[]> = this.messageService.message$;

  closeMessage(message: IMessage):void {
    this.messageService.closeMessage(message)
  }

}
