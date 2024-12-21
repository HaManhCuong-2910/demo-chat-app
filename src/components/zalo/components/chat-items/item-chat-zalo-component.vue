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
    ]"
  >
    <img
      v-if="
        props.data.type === ETypeUserChat.other &&
        listData[props.index - 1]?.type !== ETypeUserChat.other
      "
      :src="dataPerson.other.avatar"
      alt="ava"
      class="w-10 h-10 rounded-full mr-2"
    />
    <div
      class="py-[10px] min-w-20 item-container"
      :class="[
        props.data.type === ETypeUserChat.other &&
          listData[props.index - 1]?.type === ETypeUserChat.other &&
          'ml-12',
      ]"
    >
      <div
        class="replica pt-1 mb-2 flex"
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
            contenteditable="true"
            :style="`font-size: ${textSize - 2}px`"
          >
            {{ dataPerson[listData[props.data.replicaIndex].type].name }}
          </p>
          <span
            class="text-[#9b9b9b] block mt-[6px]"
            :style="`font-size: ${textSize - 2}px`"
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
        :class="[props.data.isBlueText && 'text-[#4391f6]']"
        :style="`font-size: ${textSize}px`"
        contenteditable="true"
      >
        {{ props.data.value }}
      </p>
      <span
        v-if="props.data.isDate"
        class="text-[#9b9b9bce] !leading-[0px]"
        :style="`font-size: ${textSize - 5}px`"
        contenteditable="true"
        >{{ moment(props.data.time).format("HH:mm") }}</span
      >
    </div>

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
      class="heart-number absolute right-0 -bottom-4 flex items-center"
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
          :style="`font-size: ${textSize - 4}px`"
          contenteditable="true"
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
  max-width: 65%;
  width: fit-content;
  border: 1px solid #bccdd6;
  @apply px-3 rounded-xl bg-[#d6effc] ml-auto;
}

.other {
  max-width: 75%;
  width: fit-content;

  .item-container {
    border: 1px solid #bccdd6;
    @apply bg-white rounded-xl px-3;
  }
}

.replica {
  border-left: 2px solid #3d91f6;
}
</style>
