import { Component, inject } from '@angular/core';
import { Message } from '../../enums/Message';
import { MessageService } from '../services/message.service';
import { NgTemplateOutlet } from '@angular/common';
import { IMessage } from '../interfaces/IMessage';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);
  message: typeof Message = Message;

  closeMessage(message: IMessage):void {
    this.messageService.closeMessage(message)
  }

}
