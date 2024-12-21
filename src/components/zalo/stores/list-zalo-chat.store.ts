import moment from "moment";
import {
  ETypeHeart,
  ETypeMessage,
  ETypeUserChat,
  type IDataZaloChat,
} from "../models/chat.model";

export const useListZaloChatStore = defineStore("ListZaloChatStore", () => {
  const data = ref<IDataZaloChat[]>([
    {
      type: ETypeUserChat.user,
      typeMessage: ETypeMessage.message,
      time: moment().format("HH:mm"),
      typeHeart: ETypeHeart.number,
      replicaIndex: null,
      value: "Hello",
      isDate: false,
      images: [],
      isBlueText: false,
    },
    {
      type: ETypeUserChat.other,
      typeMessage: ETypeMessage.message,
      time: moment().format("HH:mm"),
      typeHeart: ETypeHeart.none,
      replicaIndex: null,
      value: "Hi",
      isDate: false,
      images: [],
      isBlueText: false,
    },
    {
      type: ETypeUserChat.user,
      typeMessage: ETypeMessage.image,
      time: moment().format("HH:mm"),
      typeHeart: ETypeHeart.none,
      replicaIndex: null,
      value: "",
      isDate: false,
      images: ["/capture.jpg", "/capture.jpg", "/capture.jpg"],
      isBlueText: false,
    },
  ]);

  const dataDialog = ref({
    isShowDialog: false,
    isEdit: false,
    isAddAfterDialog: false,
    index: 0,
  });

  return {
    data,
    dataDialog,
  };
});
