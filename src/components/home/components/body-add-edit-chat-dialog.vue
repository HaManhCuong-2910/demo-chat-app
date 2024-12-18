<template>
  <div class="bg-gray-200 p-4">
    <div class="grid grid-cols-6 gap-4 items-center">
      <p class="text-base font-medium">Type</p>
      <div class="col-span-5 flex space-x-2">
        <button-common
          :text="'Message'"
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
          :text="'Image'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            dataInput.type === ETypeAddChat.image
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="dataInput.type = ETypeAddChat.image"
        />
      </div>
    </div>
    <div class="grid grid-cols-6 gap-4 items-center mt-3">
      <p class="text-base font-medium">Person</p>
      <div class="col-span-5 flex space-x-2">
        <button-common
          :text="'Me'"
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
          :text="'Other'"
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
      <p class="text-base font-medium">Date</p>
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
      v-if="dataInput.type === ETypeAddChat.message"
    >
      <p class="text-base font-medium">Message</p>
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
      <p class="text-base font-medium">Image</p>
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
        :text="isEditDialog ? 'Edit' : 'Add'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
        @click="isEditDialog ? handleEditMessage() : handleAddMessage()"
      />

      <button-common
        :text="'Cancel'"
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

import { ETypeButton } from "~/src/services/constant";
import { ETypeAddChat, ETypeUserChat } from "../models/home.model";
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

const dataInput = ref({
  type: ETypeAddChat.message,
  person: ETypeUserChat.user,
  date: moment().format("YYYY-MM-DD HH:mm"),
  message: "",
  image: "",
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

const handleChange = (event: any) => {
  if (event.target.files[0]) {
    dataInput.value.image = window.webkitURL.createObjectURL(
      event.target.files[0]
    );
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
          dataEdit.typeMessage === ETypeAddChat.message ? dataEdit.value : "",
        image:
          dataEdit.typeMessage === ETypeAddChat.image ? dataEdit.value : "",
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
