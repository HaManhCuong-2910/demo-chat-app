<template>
  <div class="mb-5 flex items-start">
    <img
      v-if="props.data.type === ETypeUserChat.other"
      :src="dataPerson.other.avatar"
      alt="ava"
      class="w-10 h-10 rounded-full mr-2"
    />
    <div class="image relative" :class="props.data.type">
      <img
        v-if="
          props.data.images.length === 1 &&
          props.data.typeMessage !== ETypeMessage.emoji
        "
        src="/zalo/share1.png"
        alt="image"
        class="absolute top-1/2 -translate-y-1/2 -left-11 w-8 object-contain"
      />
      <img
        v-if="
          props.data.images.length > 1 &&
          props.data.typeMessage !== ETypeMessage.emoji
        "
        src="/zalo/jt2.png"
        alt="image"
        class="absolute top-1/2 -translate-y-1/2 -left-11 w-8 object-contain"
      />
      <div class="relative">
        <div class="custom-grid-images gap-y-3 gap-x-1">
          <div
            class="rounded-xl w-full image-container"
            v-for="item in props.data.images"
            :key="item"
          >
            <img :src="item" alt="image" class="w-full h-full rounded-xl" />
          </div>
        </div>
        <img
          v-if="props.data.typeHeart === ETypeHeart.inactive"
          src="/zalo/heart-empty.png"
          alt="icon"
          class="w-7 h-7 absolute right-0 -bottom-4"
        />

        <div
          v-if="
            props.data.typeHeart === ETypeHeart.active ||
            props.data.typeHeart === ETypeHeart.number
          "
          class="heart-number absolute right-0 -bottom-4 flex items-center"
        >
          <div
            v-if="props.data.typeHeart === ETypeHeart.number"
            class="bg-gray-50 rounded-3xl h-5 flex items-center min-w-10 mr-2 relative"
          >
            <img
              src="/zalo/heart-number.png"
              alt="icon"
              class="h-full absolute w-10"
            />
            <p
              class="text-[12px] font-medium relative z-10 ml-[26px] mr-[6px]"
              contenteditable="true"
            >
              1
            </p>
          </div>

          <img src="/zalo/heart-active.png" alt="icon" class="w-7 h-7" />
        </div>
      </div>
      <p
        v-if="props.data.isDate"
        contenteditable="true"
        class="mt-2 bg-[#b6babf] text-[11px] w-fit !leading-[14px] p-[3px] py-[2px] text-white rounded-xl"
      >
        {{ moment(props.data.time).format("HH:mm") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ETypeMessage, type IDataZaloChat } from "../../models/chat.model";
import { ETypeUserChat } from "../../models/chat.model";
import { ETypeHeart } from "../../models/chat.model";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";
import { useZaloChatAreaStore } from "../../stores/zalo-chat-area.store";

const props = defineProps({
  data: {
    type: Object as PropType<IDataZaloChat>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const { data: listData } = storeToRefs(useListZaloChatStore());
const { dataPerson } = storeToRefs(useZaloChatAreaStore());
</script>

<style scoped lang="scss">
.user {
  max-width: 65%;
  width: fit-content;
  @apply rounded-xl ml-auto;
}

.other {
  max-width: 65%;
  width: fit-content;
  border: 1px solid #bccdd6;
  @apply px-3 rounded-xl;
}

.custom-grid-images {
  display: flex;
  flex-wrap: wrap;

  .image-container {
    flex-grow: 1;
    width: 32%;
  }
}
</style>
