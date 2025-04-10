import type { ETypeAddChat, ETypeUserChat } from "../../home/models/home.model";

export interface IChatsKakaotalkNew {
  time: string;
  value: string;
  images: string[];
  type: ETypeUserChat;
  typeMessage: ETypeAddChat;
  isShowTime: boolean;
  isShowAvatar: boolean;
  replicaIndex: number | null;
  icons: {
    type: string;
    src: string;
    count: number;
  }[];
}

export interface IDialogRoot<T> {
  isShowDialog: boolean;
  isShowCloseDialog: boolean;
  component?: Component;
  props: T;
}

export const dataIcons = [
  {
    type: "like",
    src: "/emoji-kakaotalk-new/like.png",
  },
  {
    type: "sad",
    src: "/emoji-kakaotalk-new/sad.png",
  },
  {
    type: "smile",
    src: "/emoji-kakaotalk-new/smile.png",
  },
  {
    type: "tich",
    src: "/emoji-kakaotalk-new/tich.png",
  },
  {
    type: "tim",
    src: "/emoji-kakaotalk-new/tim.png",
  },
  {
    type: "wow",
    src: "/emoji-kakaotalk-new/wow.png",
  },
];

export enum ETypeQuickChat {
  above = "above",
  under = "under",
}
