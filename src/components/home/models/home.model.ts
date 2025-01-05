export enum ETypeUserChat {
  user = "user",
  other = "other",
}

export enum ETypeAddChat {
  message = "message",
  image = "image",
  calling = "calling",
  called = "called",
  date = "date",
}

export enum EModeAction {
  edit = "edit",
  preview = "preview",
  fullScreen = "fullScreen",
}

export interface IDataFormAddMessage {
  type: ETypeAddChat;
  person: ETypeUserChat;
  date: string;
  message: string;
  image: string;
  isShowTime: boolean;
  isShowAvatar: boolean;
}

export interface IHomeData {
  time: string;
  chats: {
    time: string;
    value: string;
    type: ETypeUserChat;
    typeMessage: ETypeAddChat;
    isShowTime: boolean;
    isShowAvatar: boolean;
  }[];
}
