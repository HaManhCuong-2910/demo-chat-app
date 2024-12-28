import { EModeAction } from "../../home/models/home.model";

export const useZaloChatAreaStore = defineStore("ZaloChatAreaStore", () => {
  const mode = ref<EModeAction>(EModeAction.edit);

  const dataPerson = ref({
    user: {
      name: "",
      avatar: "",
    },
    other: {
      name: "Hà Mạnh Cường",
      avatar: "/avatar.png",
    },
    none: {
      name: "",
      avatar: "",
    },
  });

  return {
    mode,
    dataPerson,
  };
});
