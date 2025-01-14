<template>
  <div class="px-9">
    <div class="mb-4">
      <el-checkbox
        v-model="isWifi"
        label="Wifi"
        size="large"
        class="bg-white"
        border
      />

      <el-checkbox
        v-model="isShowAvatar"
        label="Hiện ảnh đại diện"
        size="large"
        class="bg-white"
        border
      />
      <el-checkbox
        v-model="isShowTime"
        label="Hiển thị thời gian"
        size="large"
        class="bg-white"
        border
      />
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-2">Pin</p>

      <div class="flex col-span-10">
        <el-slider v-model="battery" />
      </div>
    </div>

    <div class="mt-4">
      <form-chat-left-side :type="ETypeUserChat.user" />
    </div>

    <div class="mt-8">
      <form-chat-left-side :type="ETypeUserChat.other" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypeUserChat } from "../../home/models/home.model";
import { useKakaotalkNewStore } from "../stores/kakaotalk-new.store";

const { isWifi, battery, isShowAvatar, isShowTime } = storeToRefs(
  useKakaotalkNewStore()
);
</script>

<style scoped lang="scss"></style>
