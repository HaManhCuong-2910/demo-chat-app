export enum ETypeUserChat {
  user = "user",
  other = "other",
  none = "none",
}

export enum ETypeMessage {
  message = "message",
  image = "image",
  date = "date",
  call = "call",
  missVideo = "missVideo",
  comeVideo = "comeVideo",
  refuseVideo = "refuseVideo",
  emoji = "emoji",
  danhthiep = "danhthiep",
  bank = "bank",
  ghiam = "ghiam",
}

export enum ETypeHeart {
  none = "none",
  active = "active",
  inactive = "inactive",
  number = "number",
}

export interface IDataZaloChat {
  type: ETypeUserChat;
  typeMessage: ETypeMessage;
  time: string;
  typeHeart: ETypeHeart;
  replicaIndex: number | null;
  value: string;
  isDate: boolean;
  dateInside: boolean;
  images: string[];
  isBlueText: boolean;
}

export enum EModeChat {
  dark = "dark",
  light = "light",
}
