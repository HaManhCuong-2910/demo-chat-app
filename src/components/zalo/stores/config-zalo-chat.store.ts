import { pathDarkZalo, pathLightZalo } from "../data/zalo.source";
import { EModeChat } from "../models/chat.model";

export const useConfigZaloChatStore = defineStore("ConfigZaloChatStore", () => {
  const isWifi = ref(true);
  const battery = ref(100);
  const fontWeight = ref(500);
  const widthPercent = ref(100);
  const fixHeight = ref(true);
  const ratioH = ref(1.3);
  const showChatList = ref(0);
  const textSize = ref(24);
  const scrollChat = ref(0);
  const isHD = ref(false);
  const isShowArrow = ref(false);
  const modeChat = ref<EModeChat>(EModeChat.light);
  const backgroundScreen = ref(
    modeChat.value === EModeChat.light ? pathLightZalo : pathDarkZalo
  );

  const isTransparentHeader = ref(false);

  return {
    isWifi,
    battery,
    fontWeight,
    widthPercent,
    fixHeight,
    ratioH,
    showChatList,
    textSize,
    scrollChat,
    isHD,
    isShowArrow,
    backgroundScreen,
    isTransparentHeader,
    modeChat,
  };
});
