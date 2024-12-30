<template>
  <div class="max-w-full relative" :class="[props.data.type]">
    <div class="p-[14px] min-w-28 item-container relative" :class="[modeChat]">
      <div
        class="replica pt-1 mb-5 flex"
        v-if="props.data.replicaIndex !== null"
      >
        <img
          v-if="
            listData[props.data.replicaIndex].typeMessage === ETypeMessage.image
          "
          :src="listData[props.data.replicaIndex].images[0]"
          alt="image"
          class="w-10 max-h-8 object-contain"
        />
        <div class="pl-2">
          <p
            class="!leading-3 font-medium"
            :class="modeChat === EModeChat.dark && 'text-white'"
            contenteditable="true"
            :style="`font-size: ${textSize - 4}px`"
          >
            {{ dataPerson[listData[props.data.replicaIndex].type].name }}
          </p>
          <span
            class="text-[#9b9b9b] block mt-3"
            :style="`font-size: ${textSize - 4}px`"
            contenteditable="true"
            >{{
              props.data.replicaIndex !== null &&
              listData[props.data.replicaIndex].typeMessage ===
                ETypeMessage.image
                ? "Hình ảnh"
                : listData[props.data.replicaIndex].value
            }}</span
          >
        </div>
      </div>
      <p
        :class="[
          props.data.isBlueText && '!text-[#4391f6]',
          'break-words !leading-8',
          modeChat === EModeChat.dark ? 'text-[#dfe2e7]' : '',
        ]"
        :style="`font-size: ${textSize}px;font-weight: ${fontWeight};`"
        contenteditable="true"
      >
        {{ props.data.value }}
      </p>
      <span
        v-if="props.data.isDate && props.data.dateInside"
        class="text-[#9b9b9bce] mt-2 block"
        :style="`font-size: ${textSize - 8}px;font-weight: ${fontWeight};`"
        contenteditable="true"
        >{{ moment(props.data.time).format("HH:mm") }}</span
      >

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

      <heart-inactive-number-component :data="props.data" />
    </div>

    <p
      v-if="props.data.isDate && !props.data.dateInside"
      contenteditable="true"
      class="mt-1 w-fit !leading-[14px] p-[8px] py-[6px] text-white rounded-xl"
      :class="[modeChat === EModeChat.light && 'bg-[#b6babf]']"
      :style="`font-size: ${textSize - 8}px;font-weight: ${fontWeight};`"
    >
      {{ moment(props.data.time).format("HH:mm") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import {
  EModeChat,
  ETypeMessage,
  ETypeUserChat,
} from "../../models/chat.model";
import { ETypeHeart } from "../../models/chat.model";
import { type IDataZaloChat } from "../../models/chat.model";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";
import { useZaloChatAreaStore } from "../../stores/zalo-chat-area.store";
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";
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
const { textSize, fontWeight, modeChat } = storeToRefs(configZaloChatStore);
const { data: listData } = storeToRefs(useListZaloChatStore());
const { dataPerson } = storeToRefs(useZaloChatAreaStore());
</script>

<style scoped lang="scss">
.user {
  max-width: 81%;
  width: fit-content;
  @apply ml-auto;

  .item-container {
    @apply rounded-xl;

    &.dark {
      @apply bg-[#313d49];
    }

    &.light {
      border: 1.5px solid hsla(197, 8%, 65%, 0.631);
      @apply bg-[#d6effc];
    }
  }
}

.other {
  max-width: 81%;
  width: fit-content;

  .item-container {
    @apply rounded-xl;

    &.dark {
      @apply bg-[#292929];
    }

    &.light {
      border: 1.5px solid hsla(197, 8%, 65%, 0.631);
      @apply bg-white;
    }
  }
}

.replica {
  border-left: 2px solid #3d91f6;
}
</style>
