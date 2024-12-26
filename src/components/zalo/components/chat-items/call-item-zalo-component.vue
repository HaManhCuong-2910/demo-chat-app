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
        modeChat,
        props.data.type,
        props.data.type === ETypeUserChat.other &&
        listData[props.index - 1]?.type === ETypeUserChat.other
          ? 'ml-14'
          : '',
      ]"
    >
      <div
        class="p-4"
        :style="`${
          isDark
            ? props.data.type === ETypeUserChat.other
              ? 'border-bottom: 1.5px solid #292929'
              : 'border-bottom: 1.5px solid #37434f'
            : 'border-bottom: 1.5px solid hsla(197, 8%, 65%, 0.631)'
        }`"
      >
        <p
          class="font-medium"
          :class="[
            props.data.typeMessage === ETypeMessage.missVideo &&
              'text-[#F93F4C]',
            modeChat === EModeChat.dark && 'text-white',
          ]"
          contenteditable="true"
          :style="`font-size: ${textSize - 4}px`"
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
            class="text-[#7c798a] -mt-[2px] font-[500]"
            contenteditable="true"
            :style="`font-size: ${textSize - 6}px`"
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
  EModeChat,
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
const { textSize, modeChat } = storeToRefs(configZaloChatStore);

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

const isDark = computed(() => {
  return modeChat.value === EModeChat.dark;
});

const dataIcons = ref<
  Record<any, { img: string; content: string; description: string }>
>({
  [ETypeMessage.call]: {
    img:
      props.data.type === ETypeUserChat.user
        ? isDark.value
          ? "/zalo/h4_dark.jpg"
          : "/zalo/h4.png"
        : isDark.value
        ? "/zalo/h3_dark.jpg"
        : "/zalo/h3.png",
    content:
      props.data.type === ETypeUserChat.user
        ? "Cuộc gọi thoại đi"
        : "Cuộc gọi thoại đến",
    description: "0 phút 28 giây",
  },
  [ETypeMessage.comeVideo]: {
    img:
      props.data.type === ETypeUserChat.user
        ? isDark.value
          ? "/zalo/h6_dark.jpg"
          : "/zalo/h6.png"
        : isDark.value
        ? "/zalo/h7_dark.jpg"
        : "/zalo/h7.png",
    content:
      props.data.type === ETypeUserChat.user
        ? "Cuộc gọi video đi"
        : "Cuộc gọi video đến",
    description: "0 phút 28 giây",
  },
  [ETypeMessage.missVideo]: {
    img:
      props.data.type === ETypeUserChat.user
        ? isDark.value
          ? "/zalo/h8_dark.jpg"
          : "/zalo/bi_nho_den.jpg"
        : isDark.value
        ? "/zalo/h5_dark.jpg"
        : "/zalo/h5.png",
    content: "Bạn bị nhỡ",
    description: "Cuộc gọi video",
  },
  [ETypeMessage.refuseVideo]: {
    img:
      props.data.type === ETypeUserChat.user
        ? isDark.value
          ? "/zalo/h2_dark.jpg"
          : "/zalo/h2.png"
        : isDark.value
        ? "/zalo/h5_dark.jpg"
        : "/zalo/tu_choi_di.jpg",
    content: "Người nhận từ chối",
    description: "Cuộc gọi thoại",
  },
});
</script>

<style scoped lang="scss">
.user {
  width: 45%;
  @apply rounded-xl ml-auto;

  &.dark {
    @apply bg-[#313d49];
  }

  &.light {
    border: 1.5px solid hsla(197, 8%, 65%, 0.631);
    @apply bg-[#d6effc];
  }
}

.other {
  width: 45%;
  @apply rounded-xl;

  &.dark {
    @apply bg-[#292929];
  }

  &.light {
    border: 1.5px solid hsla(197, 8%, 65%, 0.631);
    @apply bg-white;
  }
}
</style>
