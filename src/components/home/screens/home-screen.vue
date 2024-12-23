<template>
  <div class="grid lg:grid-cols-3 grid-cols-1 gap-4">
    <div>
      <ui-feature-component />
      <div class="mt-3">
        <person-feature-component />
      </div>
      <div class="mt-3">
        <preview-config-feature-component />
      </div>
    </div>
    <div class="lg:col-span-2">
      <chat-area-component />
      <div class="sticky bottom-0" :class="`text-${positionAddButton}`">
        <button-common
          class="mt-4 !rounded-xl button-custom"
          :type="ETypeButton.primaryWhite"
          @click="isShowDialog = true"
        >
          <div class="flex items-center">
            <p class="text-base">Trò chuyện</p>
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
    width="700"
    :show-close="false"
  >
    <body-add-edit-chat-dialog />
  </el-dialog>
</template>

<script setup lang="ts">
import { ETypeButton } from "~/src/services/constant";
import { useHomeStore } from "../store/home.store";
import { useToolbarStore } from "../store/toolbar.store";
const homeStore = useHomeStore();
const toolbarStore = useToolbarStore();
const { isShowDialog } = storeToRefs(homeStore);
const { positionAddButton } = storeToRefs(toolbarStore);
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
