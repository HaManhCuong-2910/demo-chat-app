<template>
  <div class="rounded-xl bg-gray-100 p-4">
    <div class="text-center">
      <button-common
        :text="'Full Screen'"
        :class="'!rounded-xl w-1/2'"
        :class-text="'font-medium text-base'"
        :type="ETypeButton.secondary"
      />
    </div>

    <div class="grid grid-cols-2 gap-2 mt-3">
      <button-common
        :text="'Edit Mode'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
      />
      <button-common
        :text="'Preview'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
        :type="ETypeButton.secondary"
      />
    </div>
    <div class="mt-2">
      <content-chat-area-component />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypeButton } from "~/src/services/constant";
</script>

<style scoped lang="scss"></style>
