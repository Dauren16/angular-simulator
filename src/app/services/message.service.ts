import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../../enums/Message';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messageSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);

  message$: Observable<IMessage[]> = this.messageSubject.asObservable();

  addMessage(message: Omit<IMessage, 'id'>): void {
    const currentMessage = this.messageSubject.getValue()
    const withId = { ...message, id: Date.now() }
    this.messageSubject.next([ ...currentMessage, withId ])
    setTimeout(() => { this.closeMessage(withId) }, 5000);
  }

  closeMessage(message: IMessage): void {
    const closedMessage = this.messageSubject.getValue()
    this.messageSubject.next(
      closedMessage.filter((selectedMessage: IMessage) => 
        selectedMessage.id !== message.id
      )
    );
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