<template>
  <div
    :class="[
      props.data.type !== listData[props.index - 1]?.type
        ? listData[props.index - 1]?.typeHeart !== ETypeHeart.none
          ? 'mt-5'
          : 'mt-3'
        : listData[props.index - 1]?.typeHeart !== ETypeHeart.none
        ? 'mt-5'
        : 'mt-3',
      props.data.type === ETypeUserChat.other &&
      listData[props.index - 1]?.type !== ETypeUserChat.other
        ? 'flex items-start'
        : '',
      'relative',
      props.data.type,
      props.data.type === ETypeUserChat.other ? 'ml-12' : '',
    ]"
  >
    <div>
      <div class="bg-danhthiep">
        <div class="p-2 flex items-center space-x-2">
          <img src="/avatar.png" alt="avatar" class="w-8 h-w-8 rounded-full" />
          <p class="text-sm text-white" contenteditable="true">dsada</p>
        </div>
      </div>
      <div class="bg-white grid grid-cols-2 rounded-b-[8px]">
        <div class="text-center py-1 border-r border-r-gray-200">
          <p
            contenteditable="true"
            class="text-black font-medium"
            :style="`font-size: ${textSize - 3}px`"
          >
            Gọi điện
          </p>
        </div>
        <div class="text-center py-1">
          <p
            contenteditable="true"
            class="text-[#52a2f8] font-medium"
            :style="`font-size: ${textSize - 3}px`"
          >
            Nhắn tin
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ETypeHeart,
  ETypeUserChat,
  type IDataZaloChat,
} from "../../models/chat.model";
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";

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
const configZaloChatStore = useConfigZaloChatStore();
const { data: listData } = storeToRefs(useListZaloChatStore());
const { textSize } = storeToRefs(configZaloChatStore);
</script>

<style scoped lang="scss">
.bg-danhthiep {
  background-image: url("/zalo/bg-business-card.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 80px;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  @apply w-48;
}

.user {
  @apply ml-auto max-w-48;
}

.other {
  @apply max-w-48;
}
</style>
