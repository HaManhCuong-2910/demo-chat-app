export enum ETypeUserChat {
  user = "user",
  other = "other",
}

export enum ETypeAddChat {
  message = "message",
  image = "image",
}

export interface IDataFormAddMessage {
  type: ETypeAddChat;
  person: ETypeUserChat;
  date: string;
  message: string;
  image: string;
}

export interface IHomeData {
  time: string;
  chats: {
    time: string;
    value: string;
    type: ETypeUserChat;
    typeMessage: ETypeAddChat;
  }[];
}