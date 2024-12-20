<template>
  <div>
    <div class="grid grid-cols-2 gap-2 mt-3">
      <button-common
        :text="'Chế độ chỉnh sửa'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
        :type="
          mode === EModeAction.edit
            ? ETypeButton.primary
            : ETypeButton.secondary
        "
        @click="mode = EModeAction.edit"
      />
      <button-common
        :text="'Chế độ xem trước'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
        :type="
          mode === EModeAction.preview
            ? ETypeButton.primary
            : ETypeButton.secondary
        "
        @click="mode = EModeAction.preview"
      />
    </div>
    <div class="mt-2">
      <content-chat-zalo-component />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypeButton } from "~/src/services/constant";
import { EModeAction } from "../../home/models/home.model";
import { useZaloChatAreaStore } from "../stores/zalo-chat-area.store";

const zaloChatAreaStore = useZaloChatAreaStore();
const { mode } = storeToRefs(zaloChatAreaStore);
</script>

<style scoped lang="scss"></style>
