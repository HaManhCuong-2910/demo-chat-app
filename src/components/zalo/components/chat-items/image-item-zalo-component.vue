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
        style="
          background-image: url('/zalo/share1.png');
          background-repeat: no-repeat;
          background-size: contain;
        "
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
        style="
          background-image: url('/zalo/jt2.png');
          background-repeat: no-repeat;
          background-size: contain;
        "
        :class="[
          props.data.type === ETypeUserChat.other ? '-right-14' : '-left-14',
        ]"
      ></div>

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
          ]"
          v-for="(item, index) in props.data.images"
          :key="item"
        >
          <img
            :src="item"
            alt="image"
            class="w-full h-full"
            :class="
              props.data.images.length > 1
                ? index === 0
                  ? 'rounded-l-xl'
                  : index === props.data.images.length - 1
                  ? 'rounded-r-xl'
                  : ''
                : 'rounded-xl'
            "
          />
        </div>
      </div>

      <p
        v-if="props.data.isDate"
        contenteditable="true"
        class="mt-1 bg-[#b6babf] w-fit !leading-[14px] p-[8px] py-[6px] text-white rounded-xl"
        :style="`font-size: ${textSize - 6}px`"
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
