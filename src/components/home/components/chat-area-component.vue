<template>
  <div class="rounded-xl bg-gray-100 p-4">
    <div class="text-center">
      <button-common
        :text="'Toàn màn hình'"
        :class="'!rounded-xl w-1/2'"
        :class-text="'font-medium text-base'"
        :type="
          mode === EModeAction.fullScreen
            ? ETypeButton.primary
            : ETypeButton.secondary
        "
        @click="mode = EModeAction.fullScreen"
      />
    </div>

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
      <content-chat-area-component />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypeButton } from "~/src/services/constant";
import { useHomeStore } from "../store/home.store";
import { EModeAction } from "../models/home.model";

const homeStore = useHomeStore();

const { mode } = storeToRefs(homeStore);
</script>

<style scoped lang="scss"></style>
