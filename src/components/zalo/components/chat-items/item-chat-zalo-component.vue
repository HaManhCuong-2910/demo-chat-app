<template>
  <div class="user py-[10px] relative mb-5">
    <div class="replica pt-1 mb-2 flex">
      <img :src="'/1.png'" alt="image" class="w-10 object-contain" />
      <div class="pl-2">
        <p class="text-sm !leading-3 font-medium" contenteditable="true">
          Hope
        </p>
        <span
          class="text-sm text-[#9b9b9b] block mt-[6px]"
          contenteditable="true"
          >Ngày mai bạn à</span
        >
      </div>
    </div>
    <p class="text-base" contenteditable="true">Anh không</p>
    <span
      class="text-[11px] text-[#9b9b9bce] !leading-[0px]"
      contenteditable="true"
      >12:17</span
    >

    <div
      class="heart-number absolute -bottom-3 left-4 bg-gray-50 rounded-3xl h-5 flex items-center min-w-10"
    >
      <img
        src="/zalo/heart-number.png"
        alt="icon"
        class="h-full absolute w-10"
      />
      <p class="text-[12px] font-medium relative z-10 ml-[26px] mr-[6px]">10</p>
    </div>

    <img
      src="/zalo/heart-empty.png"
      alt="icon"
      class="w-7 h-7 absolute right-2 -bottom-4"
    />

    <img
      src="/zalo/heart-active.png"
      alt="icon"
      class="w-7 h-7 absolute right-2 -bottom-4"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.user {
  max-width: 65%;
  width: fit-content;
  border: 1px solid #bccdd6;
  @apply px-3 rounded-xl bg-[#d6effc] ml-auto;
}

.replica {
  border-left: 2px solid #3d91f6;
}
</style>
