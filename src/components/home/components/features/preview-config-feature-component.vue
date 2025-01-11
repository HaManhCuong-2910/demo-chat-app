<template>
  <div class="p-3 bg-gray-100 rounded-xl">
    <h3 class="text-center font-medium mb-4">Cấu hình</h3>

    <div class="text-center mb-4">
      <el-checkbox
        v-model="isWifi"
        label="Wifi"
        size="large"
        class="bg-white"
        border
      />
    </div>

    <div class="grid grid-cols-12 gap-1 items-center">
      <p class="text-base font-medium col-span-5 text-center">Ngôn ngữ</p>
      <div class="flex col-span-7">
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

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Giao diện</p>
      <div class="flex col-span-7">
        <el-select
          v-model="userInterface"
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in userInterfaces"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">
        Thanh trạng thái
      </p>
      <div class="flex col-span-7">
        <button-common
          :text="'Hiện'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            statusBar === true ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="statusBar = true"
        />
        <button-common
          :text="'Ẩn'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            statusBar === false ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="statusBar = false"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Chế độ</p>
      <div class="flex col-span-7">
        <button-common
          :text="'Sáng'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            mode === EMode.light ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="mode = EMode.light"
        />
        <button-common
          :text="'Tối'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            mode === EMode.dark ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="mode = EMode.dark"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Pin</p>

      <div class="flex col-span-7">
        <el-slider v-model="battery" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Chân trang</p>
      <div class="flex col-span-7">
        <button-common
          :text="'Hiện'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="footer === true ? ETypeButton.primary : ETypeButton.secondary"
          @click="footer = true"
        />
        <button-common
          :text="'Ẩn'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="footer === false ? ETypeButton.primary : ETypeButton.secondary"
          @click="footer = false"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Ngày hiện tại</p>
      <div class="col-span-7">
        <input-date-time-picker-common
          id="startDate"
          name="startDate"
          required
          v-model:value="currentDate"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Hiển thị Ngày</p>
      <div class="flex col-span-7">
        <button-common
          :text="'On'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            showDate === true ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="showDate = true"
        />
        <button-common
          :text="'Off'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            showDate === false ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="showDate = false"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Màu nền</p>
      <div class="flex col-span-7">
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
      <p class="text-base font-medium col-span-5 text-center">
        Phần trăm chiều rộng
      </p>

      <div class="flex col-span-7">
        <el-slider v-model="widthPercent" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">
        Cố định chiều cao
      </p>
      <div class="flex col-span-7">
        <button-common
          :text="'Bật'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            fixHeight === true ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="fixHeight = true"
        />
        <button-common
          :text="'Tắt'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            fixHeight === false ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="
            fixHeight = false;
            scrollChat = 0;
          "
        />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">
        Hiển thị khi đọc
      </p>
      <div class="flex col-span-7">
        <button-common
          :text="'Bật'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            showOnRead === true ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="showOnRead = true"
        />
        <button-common
          :text="'Tắt'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            showOnRead === false ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="
            showOnRead = false;
            scrollChat = 0;
          "
        />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3" v-if="fixHeight">
      <p class="text-base font-medium col-span-5 text-center">
        Cuộn trò chuyện
      </p>

      <div class="flex col-span-7">
        <el-slider :step="0.1" v-model="scrollChat" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">
        Tỉ lệ chiều rộng : chiều dài
      </p>

      <div class="flex col-span-7">
        <el-slider v-model="ratioH" :step="0.1" :max="3" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">
        Hiển thị danh sách trò chuyện
      </p>

      <div class="flex col-span-7">
        <el-slider v-model="showChatList" :max="maxShowList" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Kích thước chữ</p>

      <div class="flex col-span-7">
        <el-slider v-model="textSize" :max="40" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Độ đậm chữ</p>

      <div class="flex col-span-7">
        <el-slider v-model="fontWeight" :max="1000" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">
        Icon chax box ảnh
      </p>

      <div class="flex col-span-7">
        <label
          for="icon_chat_box_image"
          class="preview-image relative w-20 h-20"
        >
          <img
            :src="iconChaxBoxImage"
            alt="icon"
            class="w-full h-full object-contain"
          />
        </label>
        <input
          id="icon_chat_box_image"
          class="hidden"
          type="file"
          accept="image/*"
          @change="(event) => handleChange(event)"
        />
      </div>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <button-common
        :text="'Xuất File'"
        :class="'!rounded-xl w-full'"
        :class-text="'font-medium text-base'"
        @click="onExport"
      />
      <button-common
        :type="ETypeButton.secondary"
        :text="'Nhập File'"
        :class="'!rounded-xl w-full'"
        :class-text="'font-medium text-base'"
        @click="onInputFile"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypeButton, toBase64 } from "~/src/services/constant";
import { useToolbarStore } from "../../store/toolbar.store";
import { useHomeStore } from "../../store/home.store";
import { EMode } from "../../models/toolbar.model";

const toolbarStore = useToolbarStore();
const homeStore = useHomeStore();
const {
  isWifi,
  mode,
  iconChaxBoxImage,
  userInterface,
  userInterfaces,
  languages,
  language,
  statusBar,
  battery,
  footer,
  showDate,
  bgColor,
  widthPercent,
  ratioH,
  textSize,
  fontWeight,
  currentDate,
  fixHeight,
  scrollChat,
  showChatList,
  showOnRead,
} = storeToRefs(toolbarStore);

const { data } = storeToRefs(homeStore);

const maxShowList = computed(() => {
  if (data.value.length === 0) return 0;
  const arraysProduct = data.value.map((item) => {
    return item.chats;
  });
  let newArray = arraysProduct.reduce((a, b) => a.concat(b), []);
  return newArray.length;
});

const handleChange = async (event: any) => {
  if (event.target.files[0]) {
    iconChaxBoxImage.value = await toBase64(event.target.files[0]);
  }
};

const onExport = () => {
  const content = JSON.stringify(data.value);
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
          data.value = JSON.parse(res as string);
          const arraysProduct = data.value.map((item) => {
            return item.chats;
          });
          let newArray = arraysProduct.reduce((a, b) => a.concat(b), []);
          showChatList.value = newArray.length;
        }
        inputFile.remove();
      };

      // Read the file as text
      reader.readAsText(file);
    }
  };
};
</script>

<style scoped lang="scss"></style>
