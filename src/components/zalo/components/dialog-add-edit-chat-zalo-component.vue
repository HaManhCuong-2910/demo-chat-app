<template>
  <div class="p-4">
    <div class="grid grid-cols-3 gap-4 items-start">
      <p class="text-base font-medium">Loại user</p>
      <div class="col-span-2">
        <el-radio-group v-model="data.type">
          <el-radio :value="ETypeUserChat.user" border>Tôi</el-radio>
          <el-radio :value="ETypeUserChat.other" border>Người khác</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 items-start mt-3">
      <p class="text-base font-medium">Loại tin nhắn</p>
      <div class="col-span-2">
        <el-radio-group v-model="data.typeMessage" class="gap-3">
          <el-radio :value="ETypeMessage.message" border>Tin nhắn chữ</el-radio>
          <el-radio :value="ETypeMessage.image" border>Hình ảnh</el-radio>
          <el-radio :value="ETypeMessage.emoji" border>Emoji</el-radio>
          <el-radio :value="ETypeMessage.date" border>Ngày tháng</el-radio>
          <el-radio :value="ETypeMessage.call" border>Cuộc gọi</el-radio>
          <el-radio :value="ETypeMessage.comeVideo" border>Gọi video</el-radio>
          <el-radio :value="ETypeMessage.missVideo" border>video nhỡ</el-radio>
          <el-radio :value="ETypeMessage.refuseVideo" border
            >Từ chối cuộc gọi</el-radio
          >
        </el-radio-group>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 items-start mt-3">
      <p class="text-base font-medium">Thời gian</p>
      <div class="col-span-2">
        <input-date-time-picker-common
          id="time"
          name="time"
          required
          v-model:value="data.time"
        />
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 items-start mt-3">
      <p class="text-base font-medium">Hiện thời gian</p>
      <div class="col-span-2">
        <el-checkbox
          v-model="data.isDate"
          label="Thời gian nhắn"
          size="large"
          border
        />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4 items-start mt-3">
      <p class="text-base font-medium">Chữ xanh</p>
      <div class="col-span-2">
        <el-checkbox
          v-model="data.isBlueText"
          label="Chữ xanh"
          size="large"
          border
        />
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 items-start mt-3">
      <p class="text-base font-medium">Kiểu trái tim</p>
      <div class="col-span-2">
        <el-radio-group v-model="data.typeHeart" class="gap-3">
          <el-radio :value="ETypeHeart.none" border>Không</el-radio>
          <el-radio :value="ETypeHeart.active" border
            >Trái tim không hiện số</el-radio
          >
          <el-radio :value="ETypeHeart.inactive" border>Trái tim rỗng</el-radio>
          <el-radio :value="ETypeHeart.number" border
            >Trái tim hiện số</el-radio
          >
        </el-radio-group>
      </div>
    </div>

    <div
      class="grid grid-cols-3 gap-4 items-start mt-3"
      v-if="data.typeMessage === ETypeMessage.message"
    >
      <p class="text-base font-medium">Nội dung</p>
      <div class="col-span-2">
        <input-common
          :placeholder="'Nội dung'"
          :type="'textarea'"
          v-model:value="data.value"
        >
        </input-common>

        <picker
          :native="false"
          :data="emojiIndex"
          set="apple"
          class="mt-4 mx-auto"
          @select="onSelectEmoji"
          :showSkinTones="false"
          :showPreview="false"
        />
      </div>
    </div>

    <div
      class="grid grid-cols-4 gap-3 max-h-80 overflow-y-auto mt-4"
      v-if="data.typeMessage === ETypeMessage.emoji"
    >
      <div
        v-for="item in emojis"
        :key="item"
        class="cursor-pointer"
        @click="
          () => {
            data.images = [item];
            handleAddMessage();
          }
        "
      >
        <img :src="item" alt="icon" class="w-full h-full object-contain" />
      </div>
    </div>

    <div class="mt-3" v-if="data.typeMessage === ETypeMessage.image">
      Chọn ảnh
      <input
        id="files"
        type="file"
        accept="image/*"
        multiple
        @change="(event: any)=> {
        if (!event.target?.files) return;
        [...event.target.files].forEach(preview);
      }"
      />
      <div id="preview" class="grid grid-cols-3 gap-2"></div>
    </div>

    <div class="mt-4 flex space-x-2">
      <button-common
        :text="dataDialog.isEdit ? 'Sửa' : 'Thêm mới'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
        @click="handleAddMessage"
      />

      <button-common
        :text="'Đóng'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
        :type="ETypeButton.secondary"
        @click="closeDialog"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import {
  ETypeHeart,
  ETypeMessage,
  ETypeUserChat,
  type IDataZaloChat,
} from "../models/chat.model";
import { ETypeButton } from "~/src/services/constant";
import { useListZaloChatStore } from "../stores/list-zalo-chat.store";
import dataEmoji from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
// @ts-ignore
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import { emojis } from "../data/emoji.source";

const emojiIndex = ref(new EmojiIndex(dataEmoji));

const { data: listData, dataDialog } = storeToRefs(useListZaloChatStore());

const data = ref<IDataZaloChat>({
  type: ETypeUserChat.user,
  typeMessage: ETypeMessage.message,
  time: moment().format("YYYY-MM-DD HH:mm"),
  typeHeart: ETypeHeart.none,
  replicaIndex: null,
  value: "",
  isDate: false,
  images: [],
  isBlueText: false,
});

const onSelectEmoji = (emoji: any) => {
  data.value.value += emoji.native;
};

const preview = (file: File) => {
  const fr = new FileReader();
  data.value.images = [];
  if (!!document.querySelector("#preview")) {
    // @ts-ignore
    document.querySelector("#preview").innerHTML = "";
  }

  fr.onload = () => {
    const img = document.createElement("img");
    img.src = fr.result as string;
    img.alt = file.name;
    data.value.images.push(fr.result as string);
    document.querySelector("#preview")?.append(img);
  };
  fr.readAsDataURL(file);
};

const handleAddMessage = () => {
  if (dataDialog.value.isAddAfterDialog) {
    listData.value.splice(dataDialog.value.index + 1, 0, data.value);
  } else {
    listData.value.push(data.value);
  }
  dataDialog.value.isShowDialog = false;
};

const closeDialog = () => {
  dataDialog.value.isShowDialog = false;
};

onBeforeMount(() => {
  if (dataDialog.value.isEdit) {
    const dataEdit = listData.value[dataDialog.value.index];

    if (dataEdit) {
      data.value = JSON.parse(JSON.stringify(dataEdit));
    }
  }
});

onBeforeUnmount(() => {
  dataDialog.value.isEdit = false;
  dataDialog.value.isAddAfterDialog = false;
});
</script>

<style scoped lang="scss">
:deep(.el-radio) {
  margin-right: 15px;
}
</style>
