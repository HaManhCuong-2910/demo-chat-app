<template>
  <div class="p-10 bg-gray-100 rounded-xl mt-4">
    <h3 class="text-center font-medium mb-4">Preview Configuration</h3>
    <div class="grid grid-cols-3 gap-2">
      <el-checkbox
        v-model="isWifi"
        label="Wifi"
        size="large"
        class="bg-white"
        border
      />
      <el-checkbox
        v-model="fixHeight"
        label="fix Height"
        size="large"
        class="bg-white"
        border
      />
      <el-checkbox
        v-model="isHD"
        label="Ảnh HD"
        size="large"
        class="bg-white"
        border
      />
      <el-checkbox
        v-model="isShowArrow"
        label="Mũi tên kéo xuống"
        size="large"
        class="bg-white"
        border
      />
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5">Battery</p>

      <div class="flex col-span-7">
        <el-slider v-model="battery" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5">Width Percent</p>

      <div class="flex col-span-7">
        <el-slider v-model="widthPercent" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5">Tỉ lệ chiều cao</p>

      <div class="flex col-span-7">
        <el-slider v-model="ratioH" :step="0.1" :max="3" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3" v-if="fixHeight">
      <p class="text-base font-medium col-span-5">Scroll Chat</p>

      <div class="flex col-span-7">
        <el-button type="primary" @click="scrollChat--">Lên</el-button>
        <el-button type="danger" @click="scrollChat++">Xuống</el-button>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5">Show Chat List</p>

      <div class="flex col-span-7">
        <el-slider v-model="showChatList" :max="maxShowList" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5">Text Size</p>

      <div class="flex col-span-7">
        <el-slider v-model="textSize" :max="40" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5">Ảnh nền</p>

      <div class="col-span-7">
        Chọn ảnh nền
        <input
          id="files-anh-nen"
          type="file"
          accept="image/*"
          @change="(event: any)=> {
        if (!event.target?.files) return;
        [...event.target.files].forEach(preview);
      }"
        />
        <div id="preview-anh-nen" class="w-64 mt-4">
          <img :src="backgroundScreen" alt="das" class="w-64 h-full" />
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
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";

const configZaloChatStore = useConfigZaloChatStore();
const listZaloChatStore = useListZaloChatStore();
const {
  isWifi,
  battery,
  widthPercent,
  fixHeight,
  ratioH,
  showChatList,
  textSize,
  scrollChat,
  isHD,
  isShowArrow,
  backgroundScreen,
} = storeToRefs(configZaloChatStore);
const { data } = storeToRefs(listZaloChatStore);

const maxShowList = computed(() => {
  return data.value.length;
});

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
          showChatList.value = data.value.length;
        }
        inputFile.remove();
      };

      // Read the file as text
      reader.readAsText(file);
    }
  };
};

const preview = (file: File) => {
  const fr = new FileReader();
  backgroundScreen.value = "";
  if (!!document.querySelector("#preview-anh-nen")) {
    // @ts-ignore
    document.querySelector("#preview-anh-nen").innerHTML = "";
  }

  fr.onload = () => {
    const img = document.createElement("img");
    img.src = fr.result as string;
    img.alt = file.name;
    backgroundScreen.value = fr.result as string;
    document.querySelector("#preview-anh-nen")?.append(img);
  };
  fr.readAsDataURL(file);
};
</script>

<style scoped lang="scss"></style>
