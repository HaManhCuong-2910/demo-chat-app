import { type IDataZaloChat } from "../models/chat.model";

export const useListZaloChatStore = defineStore("ListZaloChatStore", () => {
  const data = ref<IDataZaloChat[]>([]);

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
