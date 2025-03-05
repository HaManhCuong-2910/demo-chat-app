import type {
  IChatsKakaotalkNew,
  IDialogRoot,
} from "../models/kakaotalk-new.model";

export const useChatKakaotalkNewStore = defineStore(
  "ChatKakaotalkNewStore",
  () => {
    const dataChats = ref<IChatsKakaotalkNew[]>([]);

    const dataDialogRoot = ref<IDialogRoot<object>>({
      isShowDialog: false,
      isShowCloseDialog: true,
      props: {},
    });

    return {
      dataDialogRoot,
      dataChats,
    };
  }
);
