import moment from "moment";
import { ETypeMessage, ETypeUserChat } from "../models/chat.model";

export const useListZaloChatStore = defineStore("ListZaloChatStore", () => {
  const data = ref([
    {
      type: ETypeUserChat.user,
      typeMessage: ETypeMessage.message,
      time: moment().format("HH:mm"),
    },
  ]);

  return {};
});
