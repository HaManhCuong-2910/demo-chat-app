<template>
  <div class="pt-2" :class="props.isDarkMode ? 'bg-[#080808]' : 'bg-white'">
    <div class="flex space-x-2 items-center px-4 pt-4 pb-2">
      <div>
        <div
          class="w-7 h-7 rounded-full flex justify-center items-center"
          :class="props.isDarkMode ? 'bg-[#212121]' : 'bg-gray-100'"
        >
          <font-awesome-icon
            :icon="['fas', 'plus']"
            :class="props.isDarkMode && 'text-white'"
          />
        </div>
      </div>
      <div class="flex-1">
        <input-common
          :placeholder="'Nhập tin nhắn'"
          v-model:value="value"
          :class="`custom-input ${props.isDarkMode ? 'dark-mode' : ''}`"
        >
          <template #suffix>
            <div>
              <img
                :src="
                  props.isDarkMode
                    ? '/smiley-dark-mode.jpg'
                    : '/smiley-light-mode.jpg'
                "
                alt="icon"
                class="w-6 object-contain"
              />
            </div>
          </template>
        </input-common>
      </div>
      <div>
        <img
          :src="
            props.isDarkMode
              ? '/audio-waves-dark-mode.jpg'
              : '/audio-waves-light-mode.jpg'
          "
          alt="icon"
          class="w-8 h-8 rounded-full object-contain"
        />
      </div>
    </div>
    <div class="px-4 pb-4" v-if="userInterface === EUserInterface.ios">
      <span
        class="block w-44 h-1 mx-auto mt-4 rounded-full"
        :class="props.isDarkMode ? 'bg-white' : 'bg-black'"
      ></span>
    </div>

    <img
      v-else
      :src="
        props.isDarkMode
          ? '/footer-android-dark-mode.jpg'
          : `/footer-android-light-mode.jpg`
      "
      alt="sda"
    />
  </div>
</template>

<script setup lang="ts">
import { EUserInterface } from "../models/toolbar.model";
import { useToolbarStore } from "../store/toolbar.store";

const props = defineProps({
  isDarkMode: Boolean,
});

const { userInterface } = storeToRefs(useToolbarStore());
const value = ref("");
</script>

<style scoped lang="scss">
:deep(.custom-input) {
  .el-input__wrapper {
    @apply bg-gray-100 rounded-3xl;
    padding-left: 16px;
    padding-right: 14px;

    .el-input__inner {
      font-size: 16px;
      line-height: 24px;
    }
  }

  &.dark-mode {
    .el-input__wrapper {
      @apply bg-[#202020];
    }
  }
}
</style>
