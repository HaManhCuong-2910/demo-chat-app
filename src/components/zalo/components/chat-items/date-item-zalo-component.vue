<template>
  <div
    class="mt-7 w-fit mx-auto px-[10px] py-[7px] rounded-2xl text-white"
    :class="modeChat === EModeChat.light && 'bg-[#b6babf]'"
    :style="`font-size: ${textSize - 7}px`"
    contenteditable="true"
  >
    13:54 Hôm nay
  </div>
</template>

<script setup lang="ts">
import { EModeChat } from "../../models/chat.model";
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";

const configZaloChatStore = useConfigZaloChatStore();
const { textSize, modeChat } = storeToRefs(configZaloChatStore);
</script>

<style scoped lang="scss"></style>
