import { Message } from "../../enums/Message";

export interface IMessage {
  id: number;
  message: string;
  type: Message;
}
