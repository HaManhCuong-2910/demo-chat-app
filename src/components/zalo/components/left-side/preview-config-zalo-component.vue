<template>
  <div class="p-10 bg-gray-100 rounded-xl mt-4">
    <h3 class="text-center font-medium mb-4">Preview Configuration</h3>
    <div>
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
        <el-slider :step="0.1" v-model="scrollChat" />
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
} = storeToRefs(configZaloChatStore);
const { data } = storeToRefs(listZaloChatStore);

const maxShowList = computed(() => {
  return data.value.length;
});
</script>

<style scoped lang="scss"></style>
