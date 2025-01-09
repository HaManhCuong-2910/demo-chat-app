<template>
  <font-awesome-icon
    v-if="
      [ETypeAddChat.calling, ETypeAddChat.called].includes(
        props.data.typeMessage
      )
    "
    :icon="['fas', 'phone']"
    :class="`${
      props.data.typeMessage === ETypeAddChat.calling ? 'text-green-600' : ''
    } inline -mb-[1px] ${
      props.data.typeMessage === ETypeAddChat.called ? 'mr-12' : 'mr-2'
    }  phone-icon`"
    :style="[`font-size: ${textSize + 5}px`]"
  />
  <img
    v-if="props.data.typeMessage === ETypeAddChat.call_canceled"
    src="/call-canceled.svg"
    class="mr-8 inline"
    :style="`width: ${textSize + 8}px; height: ${textSize + 8}px`"
  />
  <img
    v-if="props.data.typeMessage === ETypeAddChat.video_call_black"
    src="/video-call.png"
    class="mr-12 inline"
    :style="`width: ${textSize + 8}px; height: ${textSize + 8}px`"
  />
  <img
    v-if="props.data.typeMessage === ETypeAddChat.video_call_green"
    src="/video-call-green.png"
    class="mr-5 inline"
    :style="`width: ${textSize + 8}px; height: ${textSize + 8}px`"
  />
</template>

<script setup lang="ts">
import { ETypeAddChat, type ETypeUserChat } from "../models/home.model";
import { useToolbarStore } from "../store/toolbar.store";

const props = defineProps({
  data: {
    type: Object as PropType<{
      time: String;
      value: String;
      images: String[];
      type: ETypeUserChat;
      typeMessage: ETypeAddChat;
      isShowTime: Boolean;
      isShowAvatar: Boolean;
    }>,
    required: true,
  },
});

const { textSize } = storeToRefs(useToolbarStore());
</script>

<style scoped lang="scss"></style>
