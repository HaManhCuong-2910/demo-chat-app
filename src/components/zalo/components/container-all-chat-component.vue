<template>
  <div
    :class="[
      listData[props.index - 1]?.typeHeart !== ETypeHeart.none
        ? 'mt-8'
        : 'mt-2',
      props.item.type === ETypeUserChat.other && 'flex items-start',
    ]"
  >
    <div
      v-if="props.item.type === ETypeUserChat.other"
      :class="'w-12 h-12 mr-2'"
    >
      <img
        v-if="listData[props.index - 1]?.type !== ETypeUserChat.other"
        :src="dataPerson.other.avatar"
        alt="ava"
        class="w-full h-full rounded-full"
      />
    </div>

    <bank-card-component
      v-if="item.typeMessage === ETypeMessage.bank"
      :key="item.value"
      :data="item"
      :index="index"
    />

    <ghi-am-component
      v-if="item.typeMessage === ETypeMessage.ghiam"
      :key="item.value"
      :data="item"
      :index="index"
    />

    <business-card-zalo-component
      v-if="item.typeMessage === ETypeMessage.danhthiep"
      :key="item.value"
      :data="item"
      :index="index"
    />
    <item-chat-zalo-component
      v-if="item.typeMessage === ETypeMessage.message"
      :key="item.value"
      :data="item"
      :index="index"
    />

    <image-item-zalo-component
      v-if="
        item.typeMessage === ETypeMessage.image ||
        item.typeMessage === ETypeMessage.emoji
      "
      :key="item.value"
      :data="item"
      :index="index"
    />

    <call-item-zalo-component
      v-if="
        [
          ETypeMessage.call,
          ETypeMessage.comeVideo,
          ETypeMessage.missVideo,
          ETypeMessage.refuseVideo,
        ].includes(item.typeMessage)
      "
      :key="item.value"
      :data="item"
      :index="index"
    />

    <date-item-zalo-component v-if="item.typeMessage === ETypeMessage.date" />
  </div>
</template>

<script setup lang="ts">
import {
  ETypeHeart,
  ETypeMessage,
  ETypeUserChat,
  type IDataZaloChat,
} from "../models/chat.model";
import { useListZaloChatStore } from "../stores/list-zalo-chat.store";
import { useZaloChatAreaStore } from "../stores/zalo-chat-area.store";
const { data: listData } = storeToRefs(useListZaloChatStore());
const { dataPerson } = storeToRefs(useZaloChatAreaStore());

const props = defineProps({
  item: {
    type: Object as PropType<IDataZaloChat>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped></style>
