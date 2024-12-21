<template>
  <div :class="props.data.type" class="w-[35%]">
    <div class="p-3 border-b border-gray-300">
      <p class="text-base font-medium" contenteditable="true">
        {{ dataIcons[props.data.typeMessage].content }}
      </p>
      <div class="flex space-x-2 mt-1 items-center">
        <img
          :src="dataIcons[props.data.typeMessage].img"
          alt="image"
          class="w-4 object-contain"
        />
        <p class="text-sm text-[#7c798a]" contenteditable="true">
          0 phút 28 giây
        </p>
      </div>
    </div>
    <div class="p-1 text-center">
      <p class="text-[#4397fd] text-base font-medium" contenteditable="true">
        GỌI LẠI
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ETypeMessage,
  ETypeUserChat,
  type IDataZaloChat,
} from "../../models/chat.model";

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

const dataIcons = ref<Record<any, { img: string; content: string }>>({
  [ETypeMessage.call]: {
    img: "/zalo/h4.png",
    content:
      props.data.type === ETypeUserChat.user
        ? "Cuộc gọi thoại đi"
        : "Cuộc gọi thoại đến",
  },
  [ETypeMessage.comeVideo]: {
    img: "/zalo/h7.png",
    content:
      props.data.type === ETypeUserChat.user
        ? "Cuộc gọi video đi"
        : "Cuộc gọi video đến",
  },
  [ETypeMessage.missVideo]: {
    img: "/zalo/h5.png",
    content: "Bạn bị nhỡ",
  },
  [ETypeMessage.refuseVideo]: {
    img: "/zalo/h2.png",
    content: "Người nhận từ chối",
  },
});
</script>

<style scoped lang="scss">
.user {
  max-width: 65%;

  border: 1px solid #bccdd6;
  @apply rounded-xl bg-[#d6effc] ml-auto;
}

.other {
  max-width: 65%;

  border: 1px solid #bccdd6;
  @apply rounded-xl bg-white;
}
</style>
