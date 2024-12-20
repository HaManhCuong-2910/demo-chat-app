import { EModeAction } from "../../home/models/home.model";

export const useZaloChatAreaStore = defineStore("ZaloChatAreaStore", () => {
  const mode = ref<EModeAction>(EModeAction.edit);

  return {
    mode,
  };
});
