import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messages: IMessage[] = [];

  getMessages(): IMessage[] {
    return this.messages;
  }

  private addMessage(message: IMessage): void {
    this.messages = [message, ...this.messages];
    setTimeout(() => this.closeMessage(message), 5000);
  }

  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter((currentMessage: IMessage) => currentMessage !== message);
  }

  showWarn(text: string): void {
    this.addMessage({ message: text, type: Message.WARN });
  }

  showError(text: string): void {
    this.addMessage({ message: text, type: Message.ERROR });
  }

  showSuccess(text: string): void {
    this.addMessage({ message: text, type: Message.SUCCESS });
  }

  showInfo(text: string): void {
    this.addMessage({ message: text, type: Message.INFO });
  }

}