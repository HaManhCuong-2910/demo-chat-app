export enum ETypeUserChat {
  user = "user",
  other = "other",
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
