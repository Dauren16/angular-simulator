import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageManagementService {

  private messages: IMessage[] = [];

  getMessages(): IMessage[] {
    return this.messages;
  }

  addMessage(message: IMessage): void {
    this.messages.push(message);

    setTimeout(() => {
      this.messages.shift()
    }, 5000);
  }

  closeMessage(index: number): void {
    this.messages.splice(index, 1);
  }
}
