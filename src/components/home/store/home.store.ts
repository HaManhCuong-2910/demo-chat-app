import moment from "moment";
import {
  ETypeAddChat,
  type IDataFormAddMessage,
  type IHomeData,
} from "../models/home.model";

export const useHomeStore = defineStore("homeStore", () => {
  const data = ref<IHomeData[]>([]);
  const isEditDialog = ref(false);
  const isAddAfterDialog = ref(false);

  const dataDialogAdd = ref({
    index: 0,
    indexParent: 0,
  });

  const onAddData = (value: IDataFormAddMessage) => {
    if (data.value.length === 0) {
      data.value.push({
        time: value.date,
        chats: [
          {
            time: value.date,
            value:
              value.type === ETypeAddChat.message ? value.message : value.image,
            type: value.person,
            typeMessage: value.type,
          },
        ],
      });

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
              value.type === ETypeAddChat.message ? value.message : value.image,
            type: value.person,
            typeMessage: value.type,
          },
        ],
      });
    } else {
      data.value[
        isAddAfterDialog.value
          ? dataDialogAdd.value.indexParent
          : data.value.length - 1
      ].chats.push({
        time: value.date,
        value:
          value.type === ETypeAddChat.message ? value.message : value.image,
        type: value.person,
        typeMessage: value.type,
      });
    }
  };

  const onEditData = (value: IDataFormAddMessage) => {
    data.value[dataDialogAdd.value.indexParent].chats[
      dataDialogAdd.value.index
    ] = {
      time: value.date,
      value: value.type === ETypeAddChat.message ? value.message : value.image,
      type: value.person,
      typeMessage: value.type,
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

  const isShowDialog = ref(false);
  return {
    data,
    isShowDialog,
    dataDialogAdd,
    isEditDialog,
    isAddAfterDialog,
    onAddData,
    onEditData,
    onDeleteData,
    switchData,
  };
});
