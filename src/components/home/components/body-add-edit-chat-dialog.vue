<template>
  <div class="bg-gray-200 p-4">
    <div class="grid grid-cols-6 gap-4 items-center">
      <p class="text-base font-medium">Loại tin nhắn</p>
      <div class="col-span-5 grid grid-cols-2 gap-2">
        <button-common
          :text="'Tin nhắn chữ'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            dataInput.type === ETypeAddChat.message
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="dataInput.type = ETypeAddChat.message"
        />
        <button-common
          :text="'Hình ảnh'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            dataInput.type === ETypeAddChat.image
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="dataInput.type = ETypeAddChat.image"
        />
        <button-common
          :text="'Cuộc gọi thoại'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            dataInput.type === ETypeAddChat.calling
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="
            dataInput.type = ETypeAddChat.calling;
            dataInput.message = 'Cuộc gọi thoại';
          "
        />
        <button-common
          :text="'Kết thúc cuộc gọi'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            dataInput.type === ETypeAddChat.called
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="
            dataInput.type = ETypeAddChat.called;
            dataInput.message = '00:13';
          "
        />
        <button-common
          :text="'Ngày tháng'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            dataInput.type === ETypeAddChat.date
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="
            dataInput.type = ETypeAddChat.date;
            dataInput.message = 'Thứ Sáu, ngày 27 tháng 12, 2024';
          "
        />
      </div>
    </div>
    <div class="grid grid-cols-6 gap-4 items-center mt-3">
      <p class="text-base font-medium">Đối tượng</p>
      <div class="col-span-5 flex space-x-2">
        <button-common
          :text="'Tôi'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            dataInput.person === ETypeUserChat.user
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="dataInput.person = ETypeUserChat.user"
        />
        <button-common
          :text="'Người khác'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            dataInput.person === ETypeUserChat.other
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="dataInput.person = ETypeUserChat.other"
        />
      </div>
    </div>

    <div class="grid grid-cols-6 gap-4 items-center mt-3">
      <p class="text-base font-medium">Hiện giờ</p>
      <div class="col-span-5 flex space-x-2">
        <button-common
          :text="'Hiện'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            dataInput.isShowTime ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="dataInput.isShowTime = true"
        />
        <button-common
          :text="'Ẩn'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            !dataInput.isShowTime ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="dataInput.isShowTime = false"
        />
      </div>
    </div>
    <div class="grid grid-cols-6 gap-4 items-center mt-3">
      <p class="text-base font-medium">Ngày</p>
      <div class="col-span-5">
        <input-date-time-picker-common
          id="startDate"
          name="startDate"
          required
          v-model:value="dataInput.date"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-6 gap-4 items-center mt-3"
      v-if="dataInput.type !== ETypeAddChat.image"
    >
      <p class="text-base font-medium">Nội dung</p>
      <div class="col-span-5">
        <input-common
          :placeholder="'Message'"
          :type="'textarea'"
          v-model:value="dataInput.message"
        >
        </input-common>
      </div>
    </div>
    <div
      class="grid grid-cols-6 gap-4 items-center mt-3"
      v-if="dataInput.type === ETypeAddChat.image"
    >
      <p class="text-base font-medium">Hình ảnh</p>
      <label
        for="chat_image_input"
        class="col-span-5 h-[150px] w-full bg-white rounded-xl text-center"
      >
        <img :src="dataInput.image" alt="image" class="object-contain h-full" />
      </label>
      <input
        id="chat_image_input"
        class="hidden"
        type="file"
        accept="image/*"
        @change="handleChange"
      />
    </div>

    <picker
      v-if="dataInput.type === ETypeAddChat.message"
      :native="false"
      :data="emojiIndex"
      set="apple"
      class="mt-4 mx-auto"
      @select="onSelectEmoji"
      :showSkinTones="false"
      :showPreview="false"
      :i18n="{
        search: 'Tìm kiếm',
        notfound: 'Không tìm thấy biểu tượng cảm xúc',
        categories: {
          search: 'Kết quả tìm kiếm',
          recent: 'Thường được sử dụng',
          smileys: 'Biểu tượng mặt cười & Biểu tượng cảm xúc',
          people: 'Con người và cơ thể',
          nature: 'Động vật & Thiên nhiên',
          foods: 'Đồ ăn & đồ uống',
          activity: 'Hoạt động',
          places: 'Du lịch & Địa điểm',
          objects: 'Đối tượng',
          symbols: 'Biểu tượng',
          flags: 'Cờ',
          custom: 'Phong tục',
        },
      }"
    />

    <div class="mt-4">
      <emoji-image-picker
        @update-image="
          (val) => {
            dataInput.type = ETypeAddChat.image;
            dataInput.image = val;
          }
        "
      />
    </div>

    <div class="mt-4 flex space-x-2">
      <button-common
        :text="isEditDialog ? 'Sửa' : 'Thêm'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
        @click="isEditDialog ? handleEditMessage() : handleAddMessage()"
      />

      <button-common
        :text="'Hủy'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
        :type="ETypeButton.secondary"
        @click="closeDialog"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
// @ts-ignore
import { Picker, EmojiIndex, Emoji } from "emoji-mart-vue-fast/src";

import { ETypeButton, toBase64 } from "~/src/services/constant";
import {
  ETypeAddChat,
  ETypeUserChat,
  type IDataFormAddMessage,
} from "../models/home.model";
import moment from "moment";
import { useHomeStore } from "../store/home.store";

const emojiIndex = ref(new EmojiIndex(data));

const homeStore = useHomeStore();
const {
  data: dataHome,
  isShowDialog,
  isEditDialog,
  dataDialogAdd,
  isAddAfterDialog,
} = storeToRefs(homeStore);

const dataInput = ref<IDataFormAddMessage>({
  type: ETypeAddChat.message,
  person: ETypeUserChat.user,
  date: moment().format("YYYY-MM-DD HH:mm"),
  message: "",
  image: "",
  isShowTime: false,
});

const handleAddMessage = () => {
  homeStore.onAddData(dataInput.value);
  closeDialog();
};

const handleEditMessage = () => {
  homeStore.onEditData(dataInput.value);
  closeDialog();
};

const closeDialog = () => {
  isShowDialog.value = false;
};

const handleChange = async (event: any) => {
  if (event.target.files[0]) {
    dataInput.value.image = await toBase64(event.target.files[0]);
  }
};

const onSelectEmoji = (emoji: any) => {
  dataInput.value.message += emoji.native;
};

onBeforeMount(() => {
  if (isEditDialog.value) {
    const dataEdit =
      dataHome.value[dataDialogAdd.value.indexParent].chats[
        dataDialogAdd.value.index
      ];

    if (dataEdit) {
      dataInput.value = {
        date: dataEdit.time,
        person: dataEdit.type,
        type: dataEdit.typeMessage,
        message:
          dataEdit.typeMessage !== ETypeAddChat.image ? dataEdit.value : "",
        image:
          dataEdit.typeMessage === ETypeAddChat.image ? dataEdit.value : "",
        isShowTime: dataEdit.isShowTime,
      };
    }
  }
});

onBeforeUnmount(() => {
  isEditDialog.value = false;
  isAddAfterDialog.value = false;
});
</script>

<style scoped lang="scss"></style>
