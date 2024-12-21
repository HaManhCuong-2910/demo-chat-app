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
    ]"
  >
    <img
      v-if="
        props.data.type === ETypeUserChat.other &&
        listData[props.index - 1]?.type !== ETypeUserChat.other
      "
      :src="dataPerson.other.avatar"
      alt="ava"
      class="w-10 h-10 rounded-full"
    />
    <div
      class="image relative flex flex-wrap space-x-1 space-y-1"
      :class="[
        props.data.type,
        props.data.type === ETypeUserChat.other &&
          listData[props.index - 1]?.type === ETypeUserChat.other &&
          'ml-10',
      ]"
    >
      <div
        v-if="
          props.data.images.length === 1 &&
          props.data.typeMessage !== ETypeMessage.emoji
        "
        class="absolute w-8 h-8 top-1/2 -translate-y-1/2"
        style="
          background-image: url('/zalo/share1.png');
          background-repeat: no-repeat;
          background-size: contain;
        "
        :class="[
          props.data.type === ETypeUserChat.other ? '-right-11' : '-left-11',
        ]"
      ></div>

      <div
        v-if="
          props.data.images.length > 1 &&
          props.data.typeMessage !== ETypeMessage.emoji
        "
        class="absolute w-8 h-16 top-1/2 -translate-y-1/2"
        style="
          background-image: url('/zalo/jt2.png');
          background-repeat: no-repeat;
          background-size: contain;
        "
        :class="[
          props.data.type === ETypeUserChat.other ? '-right-11' : '-left-11',
        ]"
      ></div>

      <div
        class="rounded-xl w-full image-container"
        :class="isHD ? 'is-hd' : ''"
        v-for="item in props.data.images"
        :key="item"
      >
        <img :src="item" alt="image" class="w-full h-full rounded-xl" />
      </div>

      <p
        v-if="props.data.isDate"
        contenteditable="true"
        class="mt-2 bg-[#b6babf] w-fit !leading-[14px] p-[3px] py-[2px] text-white rounded-xl"
        :style="`font-size: ${textSize - 5}px`"
      >
        {{ moment(props.data.time).format("HH:mm") }}
      </p>

      <div
        v-if="props.data.typeHeart === ETypeHeart.inactive"
        class="w-7 h-7 absolute right-0 -bottom-4"
        style="
          background-image: url('/zalo/heart-empty.png');
          background-repeat: no-repeat;
          background-size: contain;
        "
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
          class="bg-gray-50 rounded-3xl h-5 flex items-center min-w-10 mr-2 relative"
        >
          <div
            class="w-10 h-full absolute"
            style="
              background-image: url('/zalo/heart-number.png');
              background-repeat: no-repeat;
              background-size: contain;
            "
          ></div>
          <p
            class="font-medium relative z-10 ml-[26px] mr-[6px]"
            contenteditable="true"
            :style="`font-size: ${textSize - 4}px`"
          >
            1
          </p>
        </div>

        <div
          class="w-7 h-7"
          style="
            background-image: url('/zalo/heart-active.png');
            background-repeat: no-repeat;
            background-size: contain;
          "
        ></div>
      </div>
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
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";

const configZaloChatStore = useConfigZaloChatStore();
const { textSize, isHD } = storeToRefs(configZaloChatStore);

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
      background-color: rgba($color: #000000, $alpha: 0.5);
      color: #fff;
      font-size: 12px;

      @apply rounded-md px-1;
    }
  }
}
</style>
