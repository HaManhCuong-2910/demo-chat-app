<template>
  <div class="flex space-x-2 bg-white p-4 pt-2 items-center">
    <div>
      <div
        class="w-7 h-7 rounded-full bg-gray-100 flex justify-center items-center"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </div>
    </div>
    <div class="flex-1">
      <input-common
        :placeholder="'Nhập tin nhắn'"
        v-model:value="value"
        :class="'custom-input'"
      >
        <template #suffix>
          <div>
            <img src="/smiley.png" alt="icon" class="w-6 object-contain" />
          </div>
        </template>
      </input-common>
    </div>
    <div>
      <div
        class="w-7 h-7 rounded-full bg-gray-100 flex justify-center items-center"
      >
        <img src="/audio-waves.png" alt="icon" class="w-4 object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const value = ref("");
</script>

<style scoped lang="scss">
:deep(.custom-input) {
  .el-input__wrapper {
    @apply bg-gray-100 rounded-3xl;
    padding-left: 16px;
    padding-right: 16px;

    .el-input__inner {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
