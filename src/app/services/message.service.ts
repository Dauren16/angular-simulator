import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../../enums/Message';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messageSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messageSubject.asObservable();

  private addMessage(message: string, type: Message): void {
    const newMessage: IMessage = { type, message, id: Date.now() };
    this.messageSubject.next([newMessage, ...this.messageSubject.getValue()]);

    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

  closeMessage(message: IMessage): void {
    const closedMessage: IMessage[] = this.messageSubject.getValue()
    this.messageSubject.next(
      closedMessage.filter((selectedMessage: IMessage) => 
        selectedMessage.id !== message.id
      )
    );
  }

  showWarn(text: string): void {
    this.addMessage(text, Message.WARN);
  }

  showError(text: string): void {
    this.addMessage(text, Message.ERROR);
  }

  showSuccess(text: string): void {
    this.addMessage(text, Message.SUCCESS);
  }

  showInfo(text: string): void {
    this.addMessage(text, Message.INFO);
  }

}