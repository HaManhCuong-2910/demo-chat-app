import moment from "moment";
import { EPositionToolbar, EUserInterface } from "../models/toolbar.model";

export const useToolbarStore = defineStore("toolbarStore", () => {
  const positionAddButton = ref<EPositionToolbar>(EPositionToolbar.center);
  const avatars = ref({
    user: "",
    other: "",
  });
  const names = ref({
    user: "Tôi",
    other: "Người khác",
  });

  const language = ref("en");

  const languages = ref([
    {
      label: "Tiếng anh",
      value: "en",
    },
    {
      label: "Tiếng Việt",
      value: "vi",
    },
    {
      label: "Tiếng Hàn",
      value: "ko",
    },
  ]);

  const userInterface = ref<EUserInterface>(EUserInterface.ios);

  const userInterfaces = ref([
    {
      label: "Android",
      value: EUserInterface.android,
    },
    {
      label: "IOS",
      value: EUserInterface.ios,
    },
  ]);

  const currentDate = ref(moment().format("YYYY-MM-DD HH:mm"));

  const statusBar = ref<boolean>(true);

  const battery = ref(100);

  const footer = ref(true);

  const showDate = ref(true);

  const bgColor = ref("#b6c6d6");

  const widthPercent = ref(59);
  const ratioH = ref(1);
  const showChatList = ref(0);
  const textSize = ref(16);
  const fontWeight = ref(500);

  const fixHeight = ref(false);

  const scrollChat = ref(0);

  const showOnRead = ref(true);
  return {
    userInterfaces,
    userInterface,
    positionAddButton,
    avatars,
    names,
    languages,
    language,
    statusBar,
    showDate,
    battery,
    footer,
    bgColor,
    widthPercent,
    ratioH,
    showChatList,
    textSize,
    fontWeight,
    currentDate,
    fixHeight,
    scrollChat,
    showOnRead,
  };
});
