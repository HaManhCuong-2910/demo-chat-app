<template>
  <div :class="props.data.type">
    <div class="w-full">
      <p
        v-if="
          props.data.type === ETypeUserChat.other && props.data.isShowAvatar
        "
        class="mb-6"
        :class="props.isDarkMode && 'text-white'"
        :style="`font-size: 32px; line-height: 24px`"
        contenteditable="true"
      >
        {{ names.other }}
      </p>
      <div class="flex items-end">
        <div
          class="content min-h-7 flex justify-between"
          :class="
            props.data.replicaIndex !== null ? 'min-w-72' : 'w-fit min-w-full'
          "
        >
          <div
            class="w-full flex justify-between"
            style="
              font-size: 41px;
              font-weight: 500;
              line-height: 48px;
              letter-spacing: -2px;
            "
            contenteditable="true"
            :class="
              [
                ETypeAddChat.calling,
                ETypeAddChat.called,
                ETypeAddChat.call_canceled,
                ETypeAddChat.video_call_black,
                ETypeAddChat.video_call_green,
              ].includes(props.data.typeMessage)
                ? 'min-w-[380px]'
                : ''
            "
          >
            <icon-call-chat-component
              :type-message="props.data.typeMessage"
              :text-size="46"
              :spacing="46"
            />
            <span
              class="data-value"
              style="
                font-size: 41px;
                font-weight: 500;
                line-height: 48px;
                letter-spacing: -2px;
              "
              >{{
                dataMessage[props.data.typeMessage]
                  ? dataMessage[props.data.typeMessage][language]
                  : props.data.value
              }}</span
            >
          </div>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ETypeAddChat,
  ETypeUserChat,
} from "~/src/components/home/models/home.model";
import type { IChatsKakaotalkNew } from "../../models/kakaotalk-new.model";
import { useKakaotalkNewStore } from "../../stores/kakaotalk-new.store";

const { names, language } = storeToRefs(useKakaotalkNewStore());

const props = defineProps({
  data: {
    type: Object as PropType<IChatsKakaotalkNew>,
    required: true,
  },
  isDarkMode: Boolean,
});

const dataMessage = ref<any>({
  [ETypeAddChat.calling]: {
    vi: "Cuộc gọi thoại",
    ko: "음성통화",
    en: "Cuộc gọi thoại",
  },
  [ETypeAddChat.call_canceled]: {
    vi: "Đã hủy",
    ko: "취소",
    en: "Đã hủy",
  },
  [ETypeAddChat.video_call_green]: {
    vi: "Cuộc gọi video",
    ko: "영상통화",
    en: "Cuộc gọi video",
  },
});
</script>

<style scoped lang="scss">
.user {
  max-width: 82%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  word-break: break-word;

  .content {
    @apply py-[28px] px-7 relative;
    background-color: rgb(262, 228, 0);
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
    border-radius: 28px;
  }
}
</style>
