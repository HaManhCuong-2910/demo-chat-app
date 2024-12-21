export const useConfigZaloChatStore = defineStore("ConfigZaloChatStore", () => {
  const isWifi = ref(true);
  const battery = ref(100);
  const widthPercent = ref(70);
  const fixHeight = ref(false);
  const ratioH = ref(1);
  const showChatList = ref(0);
  const textSize = ref(16);
  const scrollChat = ref(0);
  return {
    isWifi,
    battery,
    widthPercent,
    fixHeight,
    ratioH,
    showChatList,
    textSize,
    scrollChat,
  };
});
