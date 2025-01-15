<template>
  <div>
    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-3">Icon chax box ảnh</p>

      <div class="flex col-span-9">
        <el-radio-group v-model="iconChaxBoxImage">
          <el-radio value="/icon-chat-box-image.svg" size="large"
            >Loại 1</el-radio
          >
          <el-radio value="/icon-chat-box-image-2.svg" size="large"
            >Loại 2</el-radio
          >
        </el-radio-group>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-3">Tên người khác</p>

      <div class="flex col-span-9">
        <input-common
          v-model:value="names.other"
          class="custom-input"
        ></input-common>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-2 items-center mt-3">
      <p class="text-base font-medium col-span-3">Ngày tháng</p>

      <div class="flex col-span-8">
        <input-common
          v-model:value="date"
          class="custom-input"
          :class-container="'w-full'"
        ></input-common>
      </div>

      <div>
        <button-common
          :text="'Gửi'"
          :class-text="'font-medium text-base'"
          @click="onAddMessage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { useChatKakaotalkNewStore } from "../stores/chat-data-kakaotalk-new.store";
import { useKakaotalkNewStore } from "../stores/kakaotalk-new.store";
import { ETypeAddChat, ETypeUserChat } from "../../home/models/home.model";

const { iconChaxBoxImage, names } = storeToRefs(useKakaotalkNewStore());
const { dataChats } = storeToRefs(useChatKakaotalkNewStore());

const date = ref("Thứ Sáu, ngày 27 tháng 12, 2024");

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
  });
};
</script>

<style scoped lang="scss">
:deep(.custom-input) {
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
