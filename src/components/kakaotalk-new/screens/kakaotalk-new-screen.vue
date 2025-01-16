<template>
  <div
    id="container-kakaotalk-new"
    class="container-kakaotalk-new relative overflow-y-hidden"
    :style="
      backgroundScreen
        ? `background-image: url(${backgroundScreen});background-repeat: no-repeat;background-size: cover;`
        : `background-color: ${bgColor};`
    "
  >
    <div
      class="absolute top-0 left-0 w-full z-10"
      :style="`background-color: ${bgColor}F2;`"
    >
      <status-bar-kakaotalk-new :is-dark-mode="isDarkMode" />
      <header-kakaotalk-new :is-dark-mode="isDarkMode" />
    </div>
    <div
      class="pt-[273px] pb-[92.73px] px-10"
      :style="`transform: translateY(${scrollChat * -1}%);`"
    >
      <chat-area-kakaotalk-new :is-dark-mode="isDarkMode" />
    </div>
    <div class="absolute bottom-0 left-0 w-full z-10">
      <footer-kakaotalk-new :is-dark-mode="isDarkMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EMode } from "../../home/models/toolbar.model";
import { useKakaotalkNewStore } from "../stores/kakaotalk-new.store";
const {
  scrollChat,
  backgroundScreen,
  bgColor,
  mode: ModeChat,
} = storeToRefs(useKakaotalkNewStore());

const isDarkMode = computed(() => {
  return ModeChat.value === EMode.dark;
});
</script>

<style scoped lang="scss">
.container-kakaotalk-new {
  width: 1080px;
  height: 2340px;
  zoom: 0.4;
}

:deep(.custom-input) {
  .el-input__wrapper {
    @apply bg-gray-100;
    padding-left: 38px;
    padding-right: 34px;
    padding-top: 7px;
    padding-bottom: 7px;
    border-radius: 50px;

    .el-input__inner {
      font-size: 40px;
      line-height: 24px;
      height: 72px;
    }
  }

  &.dark-mode {
    .el-input__wrapper {
      @apply bg-[#202020];
    }
  }
}
</style>
