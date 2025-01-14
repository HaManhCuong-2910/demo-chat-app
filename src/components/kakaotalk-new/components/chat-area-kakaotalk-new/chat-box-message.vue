<template>
  <div :class="props.data.type">
    <p
      class="time-content whitespace-nowrap mb-1"
      :style="`font-size: 28px;font-weight: 500`"
      v-if="props.data.type === ETypeUserChat.user && props.data.isShowTime"
      contenteditable="true"
    >
      <span
        class="block text-end mb-3"
        :style="`font-size: 27px;font-weight: 500`"
        style="color: rgb(262, 228, 0)"
        contenteditable="true"
        >1
      </span>
      {{ moment(props.data.time).format(`h:mm`) }}
    </p>
    <img
      v-if="props.data.type === ETypeUserChat.other && props.data.isShowAvatar"
      :src="avatars.other"
      alt="icon"
      class="min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] rounded-[28px] mr-6 -mt-2"
    />
    <div
      :class="
        props.data.type === ETypeUserChat.other &&
        !props.data.isShowAvatar &&
        'ml-[121px]'
      "
    >
      <p
        v-if="
          props.data.type === ETypeUserChat.other && props.data.isShowAvatar
        "
        class="mb-6"
        :style="`font-size: 32px; line-height: 24px`"
        contenteditable="true"
      >
        Người khác
      </p>
      <div class="flex items-end">
        <div class="w-fit content min-h-7 flex justify-between">
          <p
            style="font-size: 41px; font-weight: 500; line-height: 48px"
            contenteditable="true"
          >
            {{ props.data.value }}
          </p>
          <svg
            v-if="
              props.data.type === ETypeUserChat.user && props.data.isShowAvatar
            "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22.23 42.69"
            class="w-7 absolute right-[-7px] top-0"
            style="fill: rgb(255, 228, 0)"
          >
            <g data-name="Layer 2">
              <path
                class="kakao_tail_svg__cls-1"
                d="M22.23.08s-7.59-1.37-15 7.05C-.74 16.13 0 21.65 0 21.65v21h16.45s.05-21.9.05-26.56c0-6.22 1.62-10.33 5.73-16.01Z"
                data-name="Layer 1"
              ></path>
            </g>
          </svg>

          <svg
            v-if="
              props.data.type === ETypeUserChat.other && props.data.isShowAvatar
            "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22.23 42.69"
            class="w-7 absolute left-[-7px] top-0"
            style="fill: rgb(255, 255, 255); transform: scaleX(-1)"
          >
            <g data-name="Layer 2">
              <path
                class="kakao_tail_svg__cls-1"
                d="M22.23.08s-7.59-1.37-15 7.05C-.74 16.13 0 21.65 0 21.65v21h16.45s.05-21.9.05-26.56c0-6.22 1.62-10.33 5.73-16.01Z"
                data-name="Layer 1"
              ></path>
            </g>
          </svg>
        </div>

        <p
          v-if="
            props.data.type === ETypeUserChat.other && props.data.isShowTime
          "
          class="time-content self-end whitespace-nowrap mt-1 mb-1"
          :style="`font-size: 28px;font-weight: 500`"
          contenteditable="true"
        >
          <span
            class="block text-start mb-3"
            :style="`font-size: 27px;font-weight: 500`"
            style="color: rgb(262, 228, 0)"
            contenteditable="true"
            >1
          </span>
          {{ moment(props.data.time).format(`h:mm`) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypeUserChat } from "~/src/components/home/models/home.model";
import type { IChatsKakaotalkNew } from "../../models/kakaotalk-new.model";
import moment from "moment";
import { useKakaotalkNewStore } from "../../stores/kakaotalk-new.store";

const { avatars } = storeToRefs(useKakaotalkNewStore());

const props = defineProps({
  data: {
    type: Object as PropType<IChatsKakaotalkNew>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.user {
  max-width: 82%;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  word-break: break-word;

  .content {
    @apply py-[28px] px-7 relative;
    background-color: rgb(262, 228, 0);
    margin-left: 18px;
    word-wrap: break-word;
    max-width: 100%;
    border-radius: 28px;
  }

  img {
    margin-left: auto;
  }
}

.other {
  max-width: calc(82% + 32px);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  word-break: break-word;
  .content {
    @apply py-[28px] px-7 relative;
    background-color: rgb(255, 255, 255);
    word-wrap: break-word;
    max-width: 100%;
    margin-right: 18px;
    border-radius: 28px;
  }
}
</style>
