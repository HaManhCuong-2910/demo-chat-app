<template>
  <div class="grid grid-cols-3 gap-4">
    <div>Tính năng chưa mở</div>
    <div class="col-span-2">
      <chat-area-component />
      <div class="text-center">
        <button-common
          class="mt-4 !rounded-xl button-custom"
          :type="ETypeButton.primaryWhite"
          @click="isShowDialog = true"
        >
          <div class="flex items-center">
            <p class="text-base">Chat</p>
            <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-white ml-2 icon-plus"
            />
          </div>
        </button-common>
      </div>
    </div>
  </div>
  <el-dialog
    destroy-on-close
    v-model="isShowDialog"
    width="500"
    :show-close="false"
  >
    <body-add-edit-chat-dialog />
  </el-dialog>
</template>

<script setup lang="ts">
import { ETypeButton } from "~/src/services/constant";
import { useHomeStore } from "../store/home.store";
const homeStore = useHomeStore();
const { isShowDialog } = storeToRefs(homeStore);
</script>

<style scoped lang="scss">
:deep(.button-custom) {
  &:hover {
    .icon-plus {
      color: #000 !important;
    }
  }
  &:focus {
    .icon-plus {
      color: #000 !important;
    }
  }
}
</style>
