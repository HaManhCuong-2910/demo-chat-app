<template>
  <div class="pt-10" :class="props.isDarkMode ? 'bg-[#141414]' : 'bg-white'">
    <div class="flex space-x-6 items-center px-10 pt-4 pb-2">
      <div>
        <div
          class="w-[82px] h-[82px] rounded-full flex justify-center items-center"
          :class="props.isDarkMode ? 'bg-[#212121]' : 'bg-gray-100'"
        >
          <font-awesome-icon
            :icon="['fas', 'plus']"
            :class="['text-[50px]', props.isDarkMode && 'text-white']"
          />
        </div>
      </div>
      <div class="flex-1">
        <input-common
          :placeholder="language === 'ko' ? '메시지 입력' : 'Nhập tin nhắn'"
          v-model:value="value"
          :class="`custom-input ${props.isDarkMode ? 'dark-mode' : ''}`"
        >
          <template #suffix>
            <div class="mt-1">
              <img
                :src="
                  props.isDarkMode
                    ? '/smiley-dark-mode.jpg'
                    : '/smiley-light-mode.jpg'
                "
                alt="icon"
                class="w-[60px] object-contain"
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
          class="w-[82px] h-[82px] rounded-full object-contain"
        />
      </div>
    </div>

    <div class="px-10 pb-8">
      <span
        class="block w-[360px] h-2 mx-auto mt-12 rounded-full"
        :class="props.isDarkMode ? 'bg-white' : 'bg-black'"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKakaotalkNewStore } from "../../stores/kakaotalk-new.store";

const { language } = storeToRefs(useKakaotalkNewStore());
const value = ref("");

const props = defineProps({
  isDarkMode: Boolean,
});
</script>

<style scoped lang="scss"></style>
