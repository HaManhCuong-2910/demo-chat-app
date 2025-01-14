<template>
  <div class="container-chat-input">
    <div
      v-for="(item, index) in dataChats"
      :class="index > 0 && 'mt-5'"
      :key="index"
    >
      <chat-box-message
        v-if="item.typeMessage === ETypeAddChat.message"
        :data="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ETypeAddChat,
  ETypeUserChat,
} from "~/src/components/home/models/home.model";
import type { IChatsKakaotalkNew } from "../../models/kakaotalk-new.model";
import moment from "moment";

const dataChats = ref<IChatsKakaotalkNew[]>([
  {
    type: ETypeUserChat.user,
    images: [],
    value: "dsa12312😘😘",
    isShowAvatar: true,
    isShowTime: true,
    time: moment().format("YYYY-MM-DD HH:mm"),
    typeMessage: ETypeAddChat.message,
  },
  {
    type: ETypeUserChat.user,
    images: [],
    value: "dsa12312😘😘",
    isShowAvatar: false,
    isShowTime: false,
    time: moment().format("YYYY-MM-DD HH:mm"),
    typeMessage: ETypeAddChat.message,
  },
  {
    type: ETypeUserChat.user,
    images: [],
    value: "dsa12312😘😘",
    isShowAvatar: false,
    isShowTime: false,
    time: moment().format("YYYY-MM-DD HH:mm"),
    typeMessage: ETypeAddChat.message,
  },
  {
    type: ETypeUserChat.other,
    images: [],
    value: "test other",
    isShowAvatar: true,
    isShowTime: true,
    time: moment().format("YYYY-MM-DD HH:mm"),
    typeMessage: ETypeAddChat.message,
  },
  {
    type: ETypeUserChat.other,
    images: [],
    value: "test other",
    isShowAvatar: false,
    isShowTime: false,
    time: moment().format("YYYY-MM-DD HH:mm"),
    typeMessage: ETypeAddChat.message,
  },
  {
    type: ETypeUserChat.other,
    images: [],
    value: "test other",
    isShowAvatar: false,
    isShowTime: false,
    time: moment().format("YYYY-MM-DD HH:mm"),
    typeMessage: ETypeAddChat.message,
  },
]);
</script>

<style scoped lang="scss"></style>
