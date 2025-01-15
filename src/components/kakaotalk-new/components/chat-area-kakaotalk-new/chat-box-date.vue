<template>
  <div
    class="py-[18px] px-6 rounded-3xl text-[35px] text-white flex items-center w-fit mx-auto mt-5 mb-3"
    :class="'bg-black bg-opacity-15'"
    contenteditable="true"
  >
    <font-awesome-icon
      :icon="['far', 'calendar-days']"
      class="text-[36px] text-white mr-3"
    />
    Thứ Sáu, ngày 27 tháng 12, 2024
    <font-awesome-icon
      :icon="['fas', 'chevron-right']"
      class="text-[35px] text-white ml-3 mt-[2px]"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
