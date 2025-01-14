import type { IChatsKakaotalkNew } from "../models/kakaotalk-new.model";

export const useChatKakaotalkNewStore = defineStore(
  "ChatKakaotalkNewStore",
  () => {
    const dataChats = ref<IChatsKakaotalkNew[]>([]);

    return {
      dataChats,
    };
  }
);
