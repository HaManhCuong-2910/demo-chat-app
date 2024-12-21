<template>
  <div
    class="flex items-start"
    :class="[
      props.data.type !== listData[props.index + 1]?.type ? 'mb-5' : 'mb-2',
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
      class="py-[10px] relative min-w-20"
      :class="[
        props.data.type,
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
          <p class="text-sm !leading-3 font-medium" contenteditable="true">
            {{ dataPerson[props.data.type].name }}
          </p>
          <span
            class="text-sm text-[#9b9b9b] block mt-[6px]"
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
      <p class="text-base" contenteditable="true">
        {{ props.data.value }}
      </p>
      <span
        v-if="props.data.isDate"
        class="text-[11px] text-[#9b9b9bce] !leading-[0px]"
        contenteditable="true"
        >{{ moment(props.data.time).format("HH:mm") }}</span
      >

      <img
        v-if="props.data.typeHeart === ETypeHeart.inactive"
        src="/zalo/heart-empty.png"
        alt="icon"
        class="w-7 h-7 absolute right-0 -bottom-4"
      />

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
          <img
            src="/zalo/heart-number.png"
            alt="icon"
            class="h-full absolute w-10"
          />
          <p
            class="text-[12px] font-medium relative z-10 ml-[26px] mr-[6px]"
            contenteditable="true"
          >
            1
          </p>
        </div>

        <img src="/zalo/heart-active.png" alt="icon" class="w-7 h-7" />
      </div>
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
  border: 1px solid #bccdd6;
  @apply px-3 rounded-xl bg-[#d6effc] ml-auto;
}

.other {
  max-width: 65%;
  width: fit-content;
  border: 1px solid #bccdd6;
  @apply px-3 rounded-xl bg-white;
}

.replica {
  border-left: 2px solid #3d91f6;
}
</style>
