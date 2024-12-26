<template>
  <div
    :class="[
      props.data.type !== listData[props.index - 1]?.type
        ? listData[props.index - 1]?.typeHeart !== ETypeHeart.none
          ? 'mt-7 '
          : 'mt-2'
        : listData[props.index - 1]?.typeHeart !== ETypeHeart.none
        ? 'mt-7 '
        : 'mt-2',
      props.data.type === ETypeUserChat.other &&
      (listData[props.index - 1]?.type !== ETypeUserChat.other ||
        (listData[props.index - 1]?.type === ETypeUserChat.other &&
          listData[props.index - 1]?.typeMessage === ETypeMessage.danhthiep))
        ? 'flex items-start'
        : '',
      'relative',
      props.data.type,
    ]"
  >
    <img
      v-if="
        props.data.type === ETypeUserChat.other &&
        (listData[props.index - 1]?.type !== ETypeUserChat.other ||
          (listData[props.index - 1]?.type === ETypeUserChat.other &&
            listData[props.index - 1]?.typeMessage === ETypeMessage.danhthiep))
      "
      :src="dataPerson.other.avatar"
      alt="ava"
      class="w-12 h-12 rounded-full mr-2"
    />
    <div class="max-w-full">
      <div
        class="p-4 min-w-28 item-container"
        :class="[
          props.data.type === ETypeUserChat.other &&
            listData[props.index - 1]?.type === ETypeUserChat.other &&
            listData[props.index - 1]?.typeMessage !== ETypeMessage.danhthiep &&
            'ml-14',
        ]"
      >
        <div
          class="replica pt-1 mb-5 flex"
          v-if="props.data.replicaIndex !== null"
        >
          <img
            v-if="
              listData[props.data.replicaIndex].typeMessage ===
              ETypeMessage.image
            "
            :src="listData[props.data.replicaIndex].images[0]"
            alt="image"
            class="w-10 max-h-8 object-contain"
          />
          <div class="pl-2">
            <p
              class="!leading-3 font-medium"
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
            props.data.isBlueText && 'text-[#4391f6]',
            'break-words font-medium !leading-8',
          ]"
          :style="`font-size: ${textSize}px;`"
          contenteditable="true"
        >
          {{ props.data.value }}
        </p>
        <span
          v-if="props.data.isDate && props.data.dateInside"
          class="text-[#9b9b9bce] mt-2 block font-medium"
          :style="`font-size: ${textSize - 5}px`"
          contenteditable="true"
          >{{ moment(props.data.time).format("HH:mm") }}</span
        >
      </div>

      <p
        v-if="props.data.isDate && !props.data.dateInside"
        contenteditable="true"
        class="mt-1 bg-[#b6babf] w-fit !leading-[14px] p-[8px] py-[6px] text-white rounded-xl font-medium"
        :class="[
          props.data.type === ETypeUserChat.other &&
            listData[props.index - 1]?.type === ETypeUserChat.other &&
            listData[props.index - 1]?.typeMessage !== ETypeMessage.danhthiep &&
            'ml-12',
        ]"
        :style="`font-size: ${textSize - 6}px`"
      >
        {{ moment(props.data.time).format("HH:mm") }}
      </p>
    </div>

    <div
      v-if="props.data.typeHeart === ETypeHeart.inactive"
      class="w-9 h-9 absolute right-0 -bottom-5"
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
      class="heart-number absolute right-0 -bottom-5 flex items-center"
    >
      <div
        v-if="props.data.typeHeart === ETypeHeart.number"
        class="bg-gray-50 rounded-3xl h-6 flex items-center min-w-10 mr-2 relative"
      >
        <div
          class="w-[50px] h-full absolute left-[-6px]"
          style="
            background-image: url('/zalo/heart-number.png');
            background-repeat: no-repeat;
            background-size: contain;
          "
        ></div>
        <p
          class="font-medium relative z-10 ml-[26px] mr-[6px]"
          :style="`font-size: ${textSize - 4}px`"
          contenteditable="true"
        >
          1
        </p>
      </div>

      <div
        class="w-9 h-9"
        style="
          background-image: url('/zalo/heart-active.png');
          background-repeat: no-repeat;
          background-size: contain;
        "
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ETypeMessage, ETypeUserChat } from "../../models/chat.model";
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
const { textSize } = storeToRefs(configZaloChatStore);
const { data: listData } = storeToRefs(useListZaloChatStore());
const { dataPerson } = storeToRefs(useZaloChatAreaStore());
</script>

<style scoped lang="scss">
.user {
  max-width: 81%;
  width: fit-content;
  @apply ml-auto;

  .item-container {
    border: 1.5px solid hsla(197, 8%, 65%, 0.631);
    @apply bg-[#d6effc] rounded-xl;
  }
}

.other {
  max-width: 89%;
  width: fit-content;

  .item-container {
    border: 1.5px solid hsla(197, 8%, 65%, 0.631);
    @apply bg-white rounded-xl;
  }
}

.replica {
  border-left: 2px solid #3d91f6;
}
</style>
