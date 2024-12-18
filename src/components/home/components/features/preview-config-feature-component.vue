<template>
  <div class="p-3 bg-gray-100 rounded-xl">
    <h3 class="text-center font-medium mb-4">Preview Configuration</h3>

    <div class="grid grid-cols-12 gap-1 items-center">
      <p class="text-base font-medium col-span-5 text-center">Language</p>
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
      <p class="text-base font-medium col-span-5 text-center">Status Bar</p>
      <div class="flex col-span-7">
        <button-common
          :text="'On'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            statusBar === true ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="statusBar = true"
        />
        <button-common
          :text="'Off'"
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
      <p class="text-base font-medium col-span-5 text-center">Battery</p>

      <div class="flex col-span-7">
        <el-slider v-model="battery" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Footer</p>
      <div class="flex col-span-7">
        <button-common
          :text="'On'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="footer === true ? ETypeButton.primary : ETypeButton.secondary"
          @click="footer = true"
        />
        <button-common
          :text="'Off'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="footer === false ? ETypeButton.primary : ETypeButton.secondary"
          @click="footer = false"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">current Date</p>
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
      <p class="text-base font-medium col-span-5 text-center">show Date</p>
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
      <p class="text-base font-medium col-span-5 text-center">
        Background color
      </p>
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
      <p class="text-base font-medium col-span-5 text-center">Width Percent</p>

      <div class="flex col-span-7">
        <el-slider v-model="widthPercent" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Fix Height</p>
      <div class="flex col-span-7">
        <button-common
          :text="'On'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            fixHeight === true ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="fixHeight = true"
        />
        <button-common
          :text="'Off'"
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
      <p class="text-base font-medium col-span-5 text-center">Show on read</p>
      <div class="flex col-span-7">
        <button-common
          :text="'On'"
          :class="'!rounded-xl w-full'"
          :class-text="'font-medium text-base'"
          :type="
            showOnRead === true ? ETypeButton.primary : ETypeButton.secondary
          "
          @click="showOnRead = true"
        />
        <button-common
          :text="'Off'"
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
      <p class="text-base font-medium col-span-5 text-center">Scroll Chat</p>

      <div class="flex col-span-7">
        <el-slider :step="0.1" v-model="scrollChat" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">W x H Ratio</p>

      <div class="flex col-span-7">
        <el-slider v-model="ratioH" :step="0.1" :max="3" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Show Chat List</p>

      <div class="flex col-span-7">
        <el-slider v-model="showChatList" :max="maxShowList" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-1 items-center mt-3">
      <p class="text-base font-medium col-span-5 text-center">Text Size</p>

      <div class="flex col-span-7">
        <el-slider v-model="textSize" :max="40" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypeButton } from "~/src/services/constant";
import { useToolbarStore } from "../../store/toolbar.store";
import { useHomeStore } from "../../store/home.store";

const toolbarStore = useToolbarStore();
const homeStore = useHomeStore();
const {
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
</script>

<style scoped lang="scss"></style>
