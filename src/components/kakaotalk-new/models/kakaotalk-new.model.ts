import type { ETypeAddChat, ETypeUserChat } from "../../home/models/home.model";

export interface IChatsKakaotalkNew {
  time: string;
  value: string;
  images: string[];
  type: ETypeUserChat;
  typeMessage: ETypeAddChat;
  isShowTime: boolean;
  isShowAvatar: boolean;
}
