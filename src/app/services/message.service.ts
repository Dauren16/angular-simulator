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
    this.messages = [...this.messages, message];
    setTimeout(() => {
      this.messages = this.messages.filter(currentMessage => currentMessage !== message)
    }, 5000);
  }

  closeMessage(index: number): void {
    this.messages.splice(index, 1);
  }
}
