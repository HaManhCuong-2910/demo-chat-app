<template>
  <div
    v-if="props.data.typeHeart === ETypeHeart.inactive_number"
    class="heart-number absolute right-0 -bottom-5 flex items-center"
  >
    <div
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
          ? '/zalo/heart-empty-dark.jpg'
          : '/zalo/heart-empty.png'
      });`"
      style="background-repeat: no-repeat; background-size: contain"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  EModeChat,
  ETypeHeart,
  type IDataZaloChat,
} from "../../../models/chat.model";
import { useConfigZaloChatStore } from "../../../stores/config-zalo-chat.store";

const props = defineProps({
  data: {
    type: Object as PropType<IDataZaloChat>,
    required: true,
  },
});

const configZaloChatStore = useConfigZaloChatStore();
const { textSize, modeChat } = storeToRefs(configZaloChatStore);
</script>

<style scoped lang="scss"></style>
