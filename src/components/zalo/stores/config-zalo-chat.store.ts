export const useConfigZaloChatStore = defineStore("ConfigZaloChatStore", () => {
  const isWifi = ref(true);
  const battery = ref(100);
  const widthPercent = ref(100);
  const fixHeight = ref(true);
  const ratioH = ref(1.3);
  const showChatList = ref(0);
  const textSize = ref(18);
  const scrollChat = ref(0);
  const isHD = ref(false);
  const isShowArrow = ref(false);
  const backgroundScreen = ref("/zalo/background.jpg");
  return {
    isWifi,
    battery,
    widthPercent,
    fixHeight,
    ratioH,
    showChatList,
    textSize,
    scrollChat,
    isHD,
    isShowArrow,
    backgroundScreen,
  };
});
