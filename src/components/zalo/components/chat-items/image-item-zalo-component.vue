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
    ]"
  >
    <img
      v-if="
        props.data.type === ETypeUserChat.other &&
        listData[props.index - 1]?.type !== ETypeUserChat.other
      "
      :src="dataPerson.other.avatar"
      alt="ava"
      class="w-12 h-12 rounded-full"
    />
    <div
      class="image relative"
      :class="[
        props.data.type,
        props.data.type === ETypeUserChat.other &&
          listData[props.index - 1]?.type === ETypeUserChat.other &&
          'ml-12',
        props.data.images.length === 1 && '!max-w-[55%]',
      ]"
    >
      <div
        v-if="
          props.data.images.length === 1 &&
          props.data.typeMessage !== ETypeMessage.emoji
        "
        class="absolute w-10 h-10 top-1/2 -translate-y-1/2"
        style="background-repeat: no-repeat; background-size: contain"
        :style="`background-image: url(${
          modeChat === EModeChat.dark
            ? '/zalo/share1-dark.jpg'
            : '/zalo/share1.png'
        });`"
        :class="[
          props.data.type === ETypeUserChat.other ? '-right-14' : '-left-14',
        ]"
      ></div>

      <div
        v-if="
          props.data.images.length > 1 &&
          props.data.typeMessage !== ETypeMessage.emoji
        "
        class="absolute w-10 h-20 top-1/2 -translate-y-1/2"
        :style="`background-image: url(${
          modeChat === EModeChat.dark ? '/zalo/jt2.jpg' : '/zalo/jt2.png'
        });`"
        style="background-repeat: no-repeat; background-size: contain"
        :class="[
          props.data.type === ETypeUserChat.other ? '-right-14' : '-left-14',
        ]"
      ></div>

      <div class="relative">
        <div class="flex flex-wrap gap-[2px]">
          <div
            class="w-full image-container"
            :class="[
              isHD ? 'is-hd' : '',
              props.data.images.length > 1
                ? index === 0
                  ? 'rounded-l-xl'
                  : index === props.data.images.length - 1
                  ? 'rounded-r-xl'
                  : ''
                : 'rounded-xl',
              props.data.images.length === 1 &&
              modeChat === EModeChat.dark &&
              props.data.type === ETypeUserChat.user
                ? 'border-[1.5px] border-[#465c74]'
                : '',
            ]"
            v-for="(item, index) in props.data.images"
            :key="item"
          >
            <img
              :src="item"
              alt="image"
              class="w-full h-full"
              :class="[
                props.data.images.length > 1
                  ? index === 0
                    ? 'rounded-l-xl'
                    : index === props.data.images.length - 1
                    ? 'rounded-r-xl'
                    : ''
                  : 'rounded-xl',
              ]"
            />
          </div>
        </div>
        <div
          v-if="props.data.typeHeart === ETypeHeart.inactive"
          class="w-9 h-9 absolute right-0 -bottom-4 rounded-full"
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
          class="heart-number absolute right-4 -bottom-4 flex items-center"
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
              contenteditable="true"
              :style="`font-size: ${textSize - 4}px`"
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
        v-if="props.data.isDate"
        contenteditable="true"
        class="mt-1 w-fit !leading-[14px] p-[8px] py-[6px] text-white rounded-xl"
        :class="modeChat === EModeChat.light && 'bg-[#b6babf]'"
        :style="`font-size: ${textSize - 6}px`"
      >
        {{ moment(props.data.time).format("HH:mm") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import {
  EModeChat,
  ETypeMessage,
  type IDataZaloChat,
} from "../../models/chat.model";
import { ETypeUserChat } from "../../models/chat.model";
import { ETypeHeart } from "../../models/chat.model";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";
import { useZaloChatAreaStore } from "../../stores/zalo-chat-area.store";
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";

const configZaloChatStore = useConfigZaloChatStore();
const { textSize, isHD, modeChat } = storeToRefs(configZaloChatStore);

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
  max-width: calc(80%);
  width: fit-content;
  @apply rounded-xl ml-auto;
}

.other {
  max-width: calc(80%);
  width: fit-content;
  @apply px-3 rounded-xl;

  .image {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}

.image-container {
  width: 30%;
  flex-grow: 1;
  position: relative;

  &.is-hd {
    &::before {
      position: absolute;
      content: "HD";
      display: block;
      top: 8px;
      left: 8px;
      background-color: rgba($color: #ffffff, $alpha: 1);
      color: #000;
      font-size: 16px;
      font-weight: 500;
      @apply rounded-md px-1;
    }
  }
}
</style>
