import { EMode, EUserInterface } from "../../home/models/toolbar.model";

export const useKakaotalkNewStore = defineStore("KakaotalkNewStore", () => {
  const isWifi = ref(true);
  const isShowAvatar = ref(true);
  const isShowTime = ref(true);

  const avatars = ref({
    other: "/avatar.png",
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

  const mode = ref<EMode>(EMode.light);

  const userInterface = ref<EUserInterface>(EUserInterface.ios);

  const iconChaxBoxImage = ref("/icon-chat-box-image.svg");

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

  const battery = ref(100);

  const bgColor = ref("#b6c6d6");

  const scrollChat = ref(0);

  return {
    isWifi,
    avatars,
    iconChaxBoxImage,
    names,
    language,
    languages,
    mode,
    userInterface,
    userInterfaces,
    battery,
    bgColor,
    scrollChat,
    isShowAvatar,
    isShowTime,
  };
});
