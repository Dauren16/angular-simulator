import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messages: IMessage[] = [];

  getMessages(): IMessage[] {
    return this.messages;
  }

  addMessage(message: IMessage): void {
    this.messages = [message, ...this.messages];
    setTimeout(() => this.closeMessage(message), 5000);
  }

  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter((currentMessage: IMessage) => currentMessage !== message);
  }

}