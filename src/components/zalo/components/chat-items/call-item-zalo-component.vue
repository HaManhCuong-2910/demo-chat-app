<template>
  <div
    :class="[
      props.data.type !== listData[props.index - 1]?.type
        ? listData[props.index - 1]?.typeHeart !== ETypeHeart.none
          ? 'mt-7 '
          : 'mt-3'
        : listData[props.index - 1]?.typeHeart !== ETypeHeart.none
        ? 'mt-7 '
        : 'mt-3',
      props.data.type === ETypeUserChat.other &&
      listData[props.index - 1]?.type !== ETypeUserChat.other
        ? 'flex items-start'
        : '',
      'relative',
    ]"
  >
    <img
      v-if="
        props.data.type === ETypeUserChat.other &&
        listData[props.index - 1]?.type !== ETypeUserChat.other
      "
      :src="dataPerson.other.avatar"
      alt="ava"
      class="w-12 h-12 rounded-full mr-2"
    />
    <div
      :class="[
        props.data.type,
        props.data.type === ETypeUserChat.other &&
        listData[props.index - 1]?.type === ETypeUserChat.other
          ? 'ml-14'
          : '',
      ]"
    >
      <div
        class="p-4"
        style="border-bottom: 1.5px solid hsla(197, 8%, 65%, 0.631)"
      >
        <p
          class="font-medium"
          :class="[
            props.data.typeMessage === ETypeMessage.missVideo &&
              'text-[#F93F4C]',
          ]"
          contenteditable="true"
          :style="`font-size: ${textSize - 6}px`"
        >
          {{ dataIcons[props.data.typeMessage].content }}
        </p>
        <div class="flex space-x-3 mt-2 items-center">
          <img
            :src="dataIcons[props.data.typeMessage].img"
            alt="image"
            class="w-5 object-contain"
          />
          <p
            class="text-[#7c798a] -mt-[2px]"
            contenteditable="true"
            :style="`font-size: ${textSize - 7}px`"
          >
            {{ dataIcons[props.data.typeMessage].description }}
          </p>
        </div>
      </div>
      <div class="p-[8px] text-center">
        <p
          class="text-[#4397fd] font-medium"
          contenteditable="true"
          :style="`font-size: ${textSize - 7}px`"
        >
          GỌI LẠI
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ETypeHeart,
  ETypeMessage,
  ETypeUserChat,
  type IDataZaloChat,
} from "../../models/chat.model";
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";
import { useZaloChatAreaStore } from "../../stores/zalo-chat-area.store";

const configZaloChatStore = useConfigZaloChatStore();
const { data: listData } = storeToRefs(useListZaloChatStore());
const { dataPerson } = storeToRefs(useZaloChatAreaStore());
const { textSize } = storeToRefs(configZaloChatStore);

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

const dataIcons = ref<
  Record<any, { img: string; content: string; description: string }>
>({
  [ETypeMessage.call]: {
    img:
      props.data.type === ETypeUserChat.user ? "/zalo/h4.png" : "/zalo/h3.png",
    content:
      props.data.type === ETypeUserChat.user
        ? "Cuộc gọi thoại đi"
        : "Cuộc gọi thoại đến",
    description: "0 phút 28 giây",
  },
  [ETypeMessage.comeVideo]: {
    img:
      props.data.type === ETypeUserChat.user ? "/zalo/h6.png" : "/zalo/h7.png",
    content:
      props.data.type === ETypeUserChat.user
        ? "Cuộc gọi video đi"
        : "Cuộc gọi video đến",
    description: "0 phút 28 giây",
  },
  [ETypeMessage.missVideo]: {
    img:
      props.data.type === ETypeUserChat.user
        ? "/zalo/bi_nho_den.jpg"
        : "/zalo/h5.png",
    content: "Bạn bị nhỡ",
    description: "Cuộc gọi video",
  },
  [ETypeMessage.refuseVideo]: {
    img:
      props.data.type === ETypeUserChat.user
        ? "/zalo/h2.png"
        : "/zalo/tu_choi_di.jpg",
    content: "Người nhận từ chối",
    description: "Cuộc gọi thoại",
  },
});
</script>

<style scoped lang="scss">
.user {
  width: 45%;

  border: 1.5px solid hsla(197, 8%, 65%, 0.631);
  @apply rounded-xl bg-[#d6effc] ml-auto;
}

.other {
  width: 45%;

  border: 1.5px solid hsla(197, 8%, 65%, 0.631);
  @apply rounded-xl bg-white;
}
</style>
