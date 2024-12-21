<template>
  <div
    class="mt-7 w-fit mx-auto px-3 py-1 rounded-2xl text-white bg-[#b6babf]"
    :style="`font-size: ${textSize - 2}px`"
    contenteditable="true"
  >
    13:54 Hôm nay
  </div>
</template>

<script setup lang="ts">
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";

const configZaloChatStore = useConfigZaloChatStore();
const { textSize } = storeToRefs(configZaloChatStore);
</script>

<style scoped lang="scss"></style>
