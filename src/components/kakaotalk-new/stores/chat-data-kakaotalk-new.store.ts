import moment from "moment";
import type {
  IChatsKakaotalkNew,
  IDialogRoot,
} from "../models/kakaotalk-new.model";
import { useKakaotalkNewStore } from "./kakaotalk-new.store";

export const useChatKakaotalkNewStore = defineStore(
  "ChatKakaotalkNewStore",
  () => {
    const dataChats = ref<IChatsKakaotalkNew[]>([]);

    const dataDialogRoot = ref<IDialogRoot<object>>({
      isShowDialog: false,
      isShowCloseDialog: true,
      props: {},
    });

    const updateDataChats = () => {
      const { language } = storeToRefs(useKakaotalkNewStore());
      const nodeList = document.querySelectorAll(".items-data-chat");
      for (let index = 0; index < nodeList.length; index++) {
        const elementRoot = nodeList[index];
        const time = moment(
          elementRoot.querySelector(".time-content")?.textContent,
          `${language.value === "ko" ? "h:mm" : "h:mm"}`
        )
          .locale("vi")
          .format("YYYY-MM-DD HH:mm");
        const dataValue = elementRoot.querySelector(".data-value");
        if (dataValue) {
          dataChats.value[index].value = dataValue.innerHTML;
        }
        dataChats.value[index].time = time;
      }
    };

    return {
      dataDialogRoot,
      dataChats,
      updateDataChats,
    };
  }
);
