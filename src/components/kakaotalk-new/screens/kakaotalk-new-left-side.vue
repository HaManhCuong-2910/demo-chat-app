<template>
  <div class="px-9">
    <div class="flex flex-wrap gap-2">
      <el-checkbox
        v-model="isWifi"
        label="Wifi"
        size="large"
        class="bg-white"
        border
      />

      <el-checkbox
        v-model="isShowArrowDown"
        label="Mũi tên kéo xuống"
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

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5">Scroll Chat</p>

      <div class="flex col-span-10">
        <el-input-number v-model="scrollChat" :min="0" />
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

const {
  isWifi,
  battery,
  isShowAvatar,
  isShowArrowDown,
  isShowTime,
  scrollChat,
} = storeToRefs(useKakaotalkNewStore());
</script>

<style scoped lang="scss"></style>
