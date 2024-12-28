import moment from "moment";
import {
  EModeAction,
  ETypeAddChat,
  ETypeUserChat,
  type IDataFormAddMessage,
  type IHomeData,
} from "../models/home.model";
import { useToolbarStore } from "./toolbar.store";

export const useHomeStore = defineStore("homeStore", () => {
  const mode = ref<EModeAction>(EModeAction.edit);

  const data = ref<IHomeData[]>([]);
  const isEditDialog = ref(false);
  const isAddAfterDialog = ref(false);

  const dataDialogAdd = ref({
    index: 0,
    indexParent: 0,
  });

  const onAddData = (value: IDataFormAddMessage) => {
    const { showChatList } = storeToRefs(useToolbarStore());
    if (data.value.length === 0) {
      data.value.push({
        time: value.date,
        chats: [
          {
            time: value.date,
            value:
              value.type === ETypeAddChat.image ? value.image : value.message,
            type: value.person,
            typeMessage: value.type,
            isShowTime: value.isShowTime,
          },
        ],
      });
      showChatList.value = showChatList.value + 1;
      return;
    }

    const onCheckAddNewTime =
      moment(
        data.value[
          isAddAfterDialog.value
            ? dataDialogAdd.value.indexParent
            : data.value.length - 1
        ].time
      )
        .startOf("day")
        .diff(moment(value.date).startOf("day"), "days") !== 0;

    if (onCheckAddNewTime) {
      data.value.push({
        time: value.date,
        chats: [
          {
            time: value.date,
            value:
              value.type === ETypeAddChat.image ? value.image : value.message,
            type: value.person,
            typeMessage: value.type,
            isShowTime: value.isShowTime,
          },
        ],
      });
      showChatList.value = showChatList.value + 1;
    } else {
      data.value[
        isAddAfterDialog.value
          ? dataDialogAdd.value.indexParent
          : data.value.length - 1
      ].chats.push({
        time: value.date,
        value: value.type === ETypeAddChat.image ? value.image : value.message,
        type: value.person,
        typeMessage: value.type,
        isShowTime: value.isShowTime,
      });
      showChatList.value = showChatList.value + 1;
    }
  };

  const onEditData = (value: IDataFormAddMessage) => {
    data.value[dataDialogAdd.value.indexParent].chats[
      dataDialogAdd.value.index
    ] = {
      time: value.date,
      value: value.type === ETypeAddChat.image ? value.image : value.message,
      type: value.person,
      typeMessage: value.type,
      isShowTime: value.isShowTime,
    };
  };

  const onDeleteData = (index: number, indexParent: number) => {
    if (data.value[indexParent].chats.length === 1) {
      data.value.splice(indexParent, 1);
      return;
    }

    data.value[indexParent].chats.splice(index, 1);
    return;
  };

  const switchData = (
    index: number,
    indexParent: number,
    value: "up" | "down"
  ) => {
    if (value === "up") {
      if (!!data.value[indexParent]?.chats[index - 1]) {
        const temp = data.value[indexParent].chats[index];
        data.value[indexParent].chats[index] =
          data.value[indexParent].chats[index - 1];
        data.value[indexParent].chats[index - 1] = temp;
      }

      if (
        !!data.value[indexParent - 1]?.chats[
          data.value[indexParent - 1]?.chats.length - 1
        ]
      ) {
        const temp = data.value[indexParent].chats[index];
        data.value[indexParent].chats[index] =
          data.value[indexParent - 1].chats[
            data.value[indexParent - 1].chats.length - 1
          ];
        data.value[indexParent - 1].chats[
          data.value[indexParent - 1].chats.length - 1
        ] = temp;
      }
    }

    if (value === "down") {
      if (!!data.value[indexParent]?.chats[index + 1]) {
        const temp = data.value[indexParent].chats[index];
        data.value[indexParent].chats[index] =
          data.value[indexParent].chats[index + 1];
        data.value[indexParent].chats[index + 1] = temp;
      }

      if (!!data.value[indexParent + 1]?.chats[0]) {
        const temp = data.value[indexParent].chats[index];
        data.value[indexParent].chats[index] =
          data.value[indexParent + 1].chats[0];
        data.value[indexParent + 1].chats[0] = temp;
      }
    }
  };

  const onCheckFirstLastInChats = (
    chats: {
      time: string;
      value: string;
      type: ETypeUserChat;
      typeMessage: ETypeAddChat;
    }[],
    type: ETypeUserChat
  ) => {
    let first = -1,
      last = -1;
    for (let index = 0; index < chats.length; index++) {
      const element = chats[index];
      if (element.type !== type) {
        continue;
      }
      if (first == -1) first = index;
      last = index;
    }

    return {
      first,
      last,
    };
  };

  const isShowDialog = ref(false);
  return {
    mode,
    data,
    isShowDialog,
    dataDialogAdd,
    isEditDialog,
    isAddAfterDialog,
    onAddData,
    onEditData,
    onDeleteData,
    switchData,
    onCheckFirstLastInChats,
  };
});
