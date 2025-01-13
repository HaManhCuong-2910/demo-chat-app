<template>
  <div
    class="container-kakaotalk-new relative"
    style="background-color: #b6c6d6"
  >
    <status-bar-kakaotalk-new />
    <header-kakaotalk-new />
    <div class="absolute bottom-0 left-0 w-full">
      <footer-kakaotalk-new />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
    border-radius: 40px;

    .el-input__inner {
      font-size: 38px;
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
