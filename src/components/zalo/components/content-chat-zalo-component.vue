<template>
  <div>
    <div
      id="chat-area"
      class="overflow-y-hidden"
      :style="`width: 591px; background-image: url(${backgroundScreen});`"
    >
      <div
        class="header relative"
        :class="[
          !isTransparentHeader && 'bg-header',
          modeChat === EModeChat.dark ? 'dark' : 'light',
        ]"
        style="height: 143px; z-index: 100"
      >
        <div class="absolute bottom-[20%] left-6">
          <img src="/zalo/arrow-left.svg" alt="arrow-left" class="h-7" />
        </div>
        <status-bar-chat-zalo-component />
        <name-header-chat-zalo-component />
        <div class="absolute flex space-x-8 bottom-[14%] right-5">
          <img src="/zalo/call.svg" alt="call" class="h-8" />
          <img src="/zalo/video.svg" alt="video" class="h-8" />
          <img src="/zalo/menu.svg" alt="menu" class="h-8" />
        </div>
      </div>
      <div
        class="content-area overflow-y-hidden"
        :style="`height: ${fixHeight ? `1020px` : '100%'}; ${
          !fixHeight ? `min-height: 1020px;` : ''
        }`"
      >
        <div
          ref="contentRef"
          class="h-full"
          :style="`transform: translateY(${scrollChat * -1}%);`"
        >
          <list-chat-zalo-component />
        </div>
      </div>
      <div class="footer relative" style="height: 117px">
        <img
          :src="
            modeChat === EModeChat.dark
              ? '/zalo/footer-dark.jpg'
              : '/zalo/ico4.png'
          "
          alt="zalo footer"
        />

        <img
          v-if="isShowArrow"
          :src="'/zalo/rj.png'"
          alt="image"
          class="w-14 h-14 rounded-full absolute -top-20 right-4"
        />
      </div>
    </div>

    <el-dialog
      destroy-on-close
      v-model="dataDialog.isShowDialog"
      :show-close="false"
    >
      <dialog-add-edit-chat-zalo-component />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { EModeChat } from "../models/chat.model";
import { useConfigZaloChatStore } from "../stores/config-zalo-chat.store";
import { useListZaloChatStore } from "../stores/list-zalo-chat.store";
import { useZaloChatAreaStore } from "../stores/zalo-chat-area.store";

const listZaloChatStore = useListZaloChatStore();
const { dataDialog } = storeToRefs(listZaloChatStore);
const configZaloChatStore = useConfigZaloChatStore();
const {
  fixHeight,
  ratioH,
  scrollChat,
  widthPercent,
  isShowArrow,
  backgroundScreen,
  isTransparentHeader,
  modeChat,
} = storeToRefs(configZaloChatStore);

const contentRef = ref<HTMLElement>();

const heightContent = computed(() => {
  return contentRef.value?.clientHeight || 0;
});
</script>

<style scoped lang="scss">
#chat-area {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.bg-header {
  &.dark {
    background-color: #22262b;
  }

  &.light {
    background-image: linear-gradient(45deg, #0486fe, #00aaf5);
  }
}
</style>
