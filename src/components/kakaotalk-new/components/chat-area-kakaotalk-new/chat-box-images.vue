<template>
  <div :class="props.data.type" @click="openDialogChangeImages">
    <div class="w-full relative">
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
      <div
        :class="`w-20 h-20 rounded-full flex justify-center overflow-hidden items-center absolute top-1/2 ${
          props.data.type === ETypeUserChat.user
            ? 'right-[104%]'
            : 'left-[104%]'
        } ${
          props.isDarkMode ? 'bg-[#2d2d2d]' : 'bg-slate-400'
        } -translate-y-1/2`"
      >
        <img
          :src="iconChaxBoxImage"
          alt="chat box"
          :class="[
            'h-[60px] !ml-[unset] object-contain',
            iconChaxBoxImage === '/icon-chat-box-image.svg'
              ? 'w-[32px]'
              : 'w-[38px]',
          ]"
        />
      </div>
      <div class="flex flex-wrap w-full gap-1">
        <div
          v-for="(item, index) in props.data.images"
          :key="item"
          class="w-full image-container"
        >
          <img :src="item" alt="image" class="w-full h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IChatsKakaotalkNew } from "../../models/kakaotalk-new.model";
import { ETypeUserChat } from "~/src/components/home/models/home.model";
import { useKakaotalkNewStore } from "../../stores/kakaotalk-new.store";
import { useChatKakaotalkNewStore } from "../../stores/chat-data-kakaotalk-new.store";

const { iconChaxBoxImage, names } = storeToRefs(useKakaotalkNewStore());
const { dataDialogRoot, dataChats } = storeToRefs(useChatKakaotalkNewStore());

const props = defineProps({
  data: {
    type: Object as PropType<IChatsKakaotalkNew>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  isDarkMode: Boolean,
});

const openDialogChangeImages = () => {
  dataDialogRoot.value.isShowDialog = true;
  dataDialogRoot.value.component = markRaw(
    defineAsyncComponent(
      () => import("../dialog-kakaotalk-new/edit-images-chats-dialog.vue")
    )
  );

  dataDialogRoot.value.props = {
    images: props.data.images,
    onConfirm: (images: string[]) => {
      dataChats.value[props.index].images = images;
      dataDialogRoot.value.isShowDialog = false;
    },
  };
};
</script>

<style scoped lang="scss">
.user {
  max-width: 86%;
  word-break: break-word;
}

.other {
  max-width: calc(86%);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  word-break: break-word;
}

:deep(img) {
  border-radius: 24px;
  // max-height: 269.99px;
}

.image-container {
  flex: 1 1 30%;
  position: relative;
}
</style>
