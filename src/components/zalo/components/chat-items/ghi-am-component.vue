<template>
  <div :class="[props.data.type]">
    <div class="relative">
      <div
        class="bg-ghi-am"
        :style="`background-image: url('${
          dataImage[modeChat][props.data.type]
        }');`"
      >
        <p
          class="absolute bottom-[14px] text-gray-500 left-[25%] text-sm font-medium"
          contenteditable="true"
        >
          00:03
        </p>
      </div>
      <div
        v-if="props.data.typeHeart === ETypeHeart.inactive"
        class="w-9 h-9 absolute right-0 -bottom-5"
        :style="`background-image: url(${
          modeChat === EModeChat.dark
            ? '/zalo/heart-empty-dark.jpg'
            : '/zalo/heart-empty.png'
        });`"
        style="background-repeat: no-repeat; background-size: contain"
      ></div>

      <div
        v-if="
          props.data.typeHeart === ETypeHeart.active ||
          props.data.typeHeart === ETypeHeart.number
        "
        class="heart-number absolute right-0 -bottom-5 flex items-center"
      >
        <div
          v-if="props.data.typeHeart === ETypeHeart.number"
          class="rounded-3xl overflow-hidden h-7 flex items-center min-w-[50px] mr-2 relative"
          :class="modeChat === EModeChat.dark ? 'bg-[#292929]' : 'bg-gray-50'"
        >
          <div
            class="w-[100px] h-full absolute left-[0px]"
            :style="`background-image: url(${
              modeChat === EModeChat.dark
                ? '/zalo/heart-number-dark.png'
                : '/zalo/heart-number.png'
            });`"
            style="background-repeat: no-repeat; background-size: contain"
          ></div>
          <p
            class="font-medium relative z-10 ml-[32px] mr-[6px]"
            :style="`font-size: ${textSize - 4}px`"
            contenteditable="true"
            :class="modeChat === EModeChat.dark && 'text-white'"
          >
            1
          </p>
        </div>

        <div
          class="w-9 h-9 rounded-full"
          :style="`background-image: url(${
            modeChat === EModeChat.dark
              ? '/zalo/heart-active-dark.png'
              : '/zalo/heart-active.png'
          });`"
          style="background-repeat: no-repeat; background-size: contain"
        ></div>
      </div>
    </div>
    <p
      v-if="props.data.isDate && !props.data.dateInside"
      contenteditable="true"
      class="mt-1 w-fit !leading-[14px] p-[8px] py-[6px] text-white rounded-xl"
      :class="[modeChat === EModeChat.light && 'bg-[#b6babf]']"
      :style="`font-size: ${textSize - 6}px;font-weight: ${fontWeight};`"
    >
      {{ moment(props.data.time).format("HH:mm") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import {
  EModeChat,
  ETypeHeart,
  ETypeMessage,
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

const dataImage = ref({
  [EModeChat.dark]: {
    [ETypeUserChat.none]: "/zalo/ghi-am-user-dark.jpg",
    [ETypeUserChat.user]: "/zalo/ghi-am-user-dark.jpg",
    [ETypeUserChat.other]: "/zalo/ghi-am-other-dark.jpg",
  },
  [EModeChat.light]: {
    [ETypeUserChat.none]: "/zalo/ghi-am-user-dark.jpg",
    [ETypeUserChat.user]: "/zalo/ghi-am-user.jpg",
    [ETypeUserChat.other]: "/zalo/ghi-am-other.jpg",
  },
});

const configZaloChatStore = useConfigZaloChatStore();
const { data: listData } = storeToRefs(useListZaloChatStore());
const { textSize, modeChat, fontWeight } = storeToRefs(configZaloChatStore);
</script>

<style scoped lang="scss">
.bg-ghi-am {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 80px;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  @apply w-[300px];
}

.user {
  @apply ml-auto max-w-[300px];
}

.other {
  @apply max-w-[300px];
}
</style>
