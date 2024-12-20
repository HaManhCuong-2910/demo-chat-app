<template>
  <div class="image user relative mb-5">
    <!-- <img
      src="/zalo/share1.png"
      alt="image"
      class="absolute top-1/2 -translate-y-1/2 -left-11 w-8 object-contain"
    /> -->
    <img
      src="/zalo/jt2.png"
      alt="image"
      class="absolute top-1/2 -translate-y-1/2 -left-11 w-8 object-contain"
    />
    <div class="relative">
      <div class="custom-grid-images gap-y-3 gap-x-1">
        <div class="rounded-xl w-full image-container">
          <img
            :src="'/capture.jpg'"
            alt="image"
            class="w-full h-full rounded-xl"
          />
        </div>
      </div>
      <div
        class="heart-number absolute -bottom-3 right-[20%] bg-gray-50 rounded-3xl h-5 flex items-center min-w-10"
      >
        <img
          src="/zalo/heart-number.png"
          alt="icon"
          class="h-full absolute w-10"
        />
        <p class="text-[12px] font-medium relative z-10 ml-[26px] mr-[6px]">
          10
        </p>
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
    <p
      contenteditable="true"
      class="mt-2 bg-[#b6babf] text-[11px] w-fit !leading-[14px] p-[3px] py-[2px] text-white rounded-xl"
    >
      17:00
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.user {
  max-width: 65%;
  width: fit-content;
  @apply rounded-xl ml-auto;
}

.custom-grid-images {
  display: flex;
  flex-wrap: wrap;

  .image-container {
    flex-grow: 1;
    width: 32%;
  }
}
</style>
