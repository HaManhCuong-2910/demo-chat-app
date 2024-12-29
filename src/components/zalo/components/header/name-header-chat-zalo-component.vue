<template>
  <div
    class="absolute left-[60px]"
    :class="isShowTimeChat ? 'bottom-[10%]' : 'bottom-[19%]'"
  >
    <h3 contenteditable="true" class="text-[28px] font-medium text-white mb-1">
      Tên demo
    </h3>
    <p
      v-if="isShowTimeChat"
      contenteditable="true"
      class="text-xl"
      :class="
        isTransparentHeader || modeChat === EModeChat.dark
          ? 'text-gray-200'
          : 'text-[#c6e1fb]'
      "
    >
      Thời gian online
    </p>
  </div>
</template>

<script setup lang="ts">
import { EModeChat } from "../../models/chat.model";
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";

const configZaloChatStore = useConfigZaloChatStore();
const { isTransparentHeader, modeChat, isShowTimeChat } =
  storeToRefs(configZaloChatStore);
</script>

<style scoped lang="scss"></style>
