<template>
  <font-awesome-icon
    v-if="
      [ETypeAddChat.calling, ETypeAddChat.called].includes(props.typeMessage)
    "
    :icon="['fas', 'phone']"
    :class="`${
      props.typeMessage === ETypeAddChat.calling ? 'text-green-600' : ''
    } inline -mb-[1px]  phone-icon`"
    :style="[
      `font-size: ${textSize + 5}px`,
      `margin-right: ${
        props.typeMessage === ETypeAddChat.called
          ? `${props.spacing + 48}`
          : `${props.spacing + 8}`
      }px`,
    ]"
  />
  <img
    v-if="props.typeMessage === ETypeAddChat.call_canceled"
    src="/call-canceled.svg"
    class="inline"
    :style="[
      `width: ${props.textSize + 8}px; height: ${props.textSize + 8}px`,
      `margin-right: ${props.spacing + 32}px`,
    ]"
  />
  <img
    v-if="props.typeMessage === ETypeAddChat.video_call_black"
    src="/video-call.png"
    class="inline"
    :style="[
      `width: ${props.textSize + 8}px; height: ${props.textSize + 8}px`,
      `margin-right: ${props.spacing + 48}px`,
    ]"
  />
  <img
    v-if="props.typeMessage === ETypeAddChat.video_call_green"
    src="/video-call-green.png"
    class="inline"
    :style="[
      `width: ${props.textSize + 8}px; height: ${props.textSize + 8}px`,
      `margin-right: ${props.spacing + 20}px`,
    ]"
  />
</template>

<script setup lang="ts">
import { ETypeAddChat } from "../models/home.model";
import { useToolbarStore } from "../store/toolbar.store";

const props = defineProps({
  typeMessage: {
    type: String as PropType<ETypeAddChat>,
    required: true,
  },
  textSize: {
    type: Number,
    required: true,
  },
  spacing: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped lang="scss"></style>
