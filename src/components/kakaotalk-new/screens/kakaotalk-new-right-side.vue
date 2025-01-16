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

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-3">Chế độ</p>
      <div class="flex col-span-9">
        <button-common
          :text="'Sáng'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            mode === EMode.light ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="
            mode = EMode.light;
            bgColor = '#b6c6d6';
          "
        />
        <button-common
          :text="'Tối'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            mode === EMode.dark ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="
            mode = EMode.dark;
            bgColor = '#141414';
          "
        />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-3">Màu nền</p>
      <div class="flex col-span-9">
        <el-color-picker v-model="bgColor" />
        <div
          class="bg-white w-8 h-8 rounded-full flex justify-center items-center ml-3"
          @click="bgColor = '#b6c6d6'"
        >
          <font-awesome-icon :icon="['fas', 'rotate-left']" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-3">Ngôn ngữ</p>
      <div class="flex col-span-9">
        <el-select v-model="language" placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in languages"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-3">Ảnh nền</p>

      <div class="col-span-9">
        <div class="flex items-center">
          <input
            id="files-anh-nen-kakaotalk-new"
            type="file"
            accept="image/*"
            @change="(event: any)=> {
        if (!event.target?.files) return;
        [...event.target.files].forEach(preview);
      }"
          />
          <div
            class="bg-white w-8 h-8 rounded-full flex justify-center items-center ml-3"
            @click="backgroundScreen = ''"
          >
            <font-awesome-icon :icon="['fas', 'rotate-left']" />
          </div>
        </div>
        <div class="max-w-64 w-full mt-4">
          <img
            :src="backgroundScreen"
            alt="Ảnh nền"
            class="max-w-64 w-full h-full"
          />
        </div>
      </div>
    </div>

    <div class="mt-4">
      <el-button type="primary" @click="onExport">Xuất File</el-button>
      <el-button type="primary" @click="onInputFile">Nhập File</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { useChatKakaotalkNewStore } from "../stores/chat-data-kakaotalk-new.store";
import { useKakaotalkNewStore } from "../stores/kakaotalk-new.store";
import { ETypeAddChat, ETypeUserChat } from "../../home/models/home.model";
import { EMode } from "../../home/models/toolbar.model";
import { ETypeButton } from "~/src/services/constant";

const {
  iconChaxBoxImage,
  names,
  backgroundScreen,
  languages,
  language,
  mode,
  bgColor,
} = storeToRefs(useKakaotalkNewStore());
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

const preview = (file: File) => {
  const fr = new FileReader();
  backgroundScreen.value = "";
  // @ts-ignore
  document.querySelector("#files-anh-nen-kakaotalk-new").value = null;
  fr.onload = () => {
    const img = document.createElement("img");
    img.src = fr.result as string;
    img.alt = file.name;
    backgroundScreen.value = fr.result as string;
  };
  fr.readAsDataURL(file);
};

const onExport = () => {
  const content = JSON.stringify(dataChats.value);
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.txt";
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
};

const onInputFile = () => {
  const inputFile = document.createElement("input");
  inputFile.type = "file";
  inputFile.accept = ".txt";
  inputFile.click();

  inputFile.onchange = (event: any) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      // Event listener for when the file is loaded
      reader.onload = (e) => {
        const res = e.target?.result;
        if (res) {
          dataChats.value = JSON.parse(res as string);
        }
        inputFile.remove();
      };

      // Read the file as text
      reader.readAsText(file);
    }
  };
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
