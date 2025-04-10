<template>
  <div class="grid grid-cols-12 gap-2 items-center mt-3">
    <p class="text-base font-medium col-span-3">Ngày tháng</p>

    <div class="flex col-span-7">
      <input-common
        v-model:value="date"
        class="custom-input-date"
        :class-container="'w-full'"
      ></input-common>
    </div>

    <div class="col-span-2">
      <button-common
        :text="'Gửi'"
        :class-text="'font-medium text-base'"
        @click="onAddMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import {
  ETypeAddChat,
  ETypeUserChat,
} from "~/src/components/home/models/home.model";
import { useChatKakaotalkNewStore } from "../../stores/chat-data-kakaotalk-new.store";
import { useKakaotalkNewStore } from "../../stores/kakaotalk-new.store";
const chatKakaotalkNewStore = useChatKakaotalkNewStore();
const { dataChats } = storeToRefs(chatKakaotalkNewStore);
const { language } = storeToRefs(useKakaotalkNewStore());
const emit = defineEmits(["onClose"]);

const date = ref("2024년 12월 27일 금요일");

const onAddMessage = () => {
  dataChats.value.push({
    images: [],
    isShowAvatar: false,
    isShowTime: false,
    time: moment().format("YYYY-MM-DD HH:mm"),
    type: ETypeUserChat.user,
    typeMessage: ETypeAddChat.date,
    value: date.value,
    replicaIndex: null,
    icons: [],
  });

  emit("onClose");
};

watch(
  () => language.value,
  () => {
    if (language.value === "ko") {
      date.value = "2024년 12월 27일 금요일";
    } else {
      date.value = "Thứ Sáu, ngày 27 tháng 12, 2024";
    }
  }
);
</script>

<style scoped lang="scss">
:deep(.custom-input-date) {
  .el-input__wrapper {
    @apply bg-gray-100;

    .el-input__inner {
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }
  }
}
</style>
