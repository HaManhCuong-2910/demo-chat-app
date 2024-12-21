<template>
  <div>
    <div id="chat-area" :style="`width: ${widthPercent}%`">
      <div class="header relative">
        <img src="/zalo/ico7.png" alt="zalo header" class="w-full" />
        <status-bar-chat-zalo-component />
        <name-header-chat-zalo-component />
      </div>
      <div
        class="content-area overflow-y-hidden"
        :style="`height: ${fixHeight ? `${ratioH * (797 + 92)}px` : '100%'}; ${
          !fixHeight ? `min-height: ${ratioH * (797 + 92)}px;` : ''
        }`"
      >
        <div
          class="h-full"
          :style="`transform: translateY(${
            (scrollChat / 100) * ratioH * (797 + 92 + 200) * -1
          }px);`"
        >
          <list-chat-zalo-component />
        </div>
      </div>
      <div class="footer relative">
        <img src="/zalo/ico4.png" alt="zalo footer" />

        <img
          v-if="isShowArrow"
          :src="'/zalo/rj.png'"
          alt="image"
          class="w-11 h-11 rounded-full absolute -top-20 right-4"
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
import { useConfigZaloChatStore } from "../stores/config-zalo-chat.store";
import { useListZaloChatStore } from "../stores/list-zalo-chat.store";
import { useZaloChatAreaStore } from "../stores/zalo-chat-area.store";

const listZaloChatStore = useListZaloChatStore();
const { dataDialog } = storeToRefs(listZaloChatStore);
const configZaloChatStore = useConfigZaloChatStore();
const { fixHeight, ratioH, scrollChat, widthPercent, isShowArrow } =
  storeToRefs(configZaloChatStore);
</script>

<style scoped lang="scss">
#chat-area {
  background-image: url("/zalo/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
