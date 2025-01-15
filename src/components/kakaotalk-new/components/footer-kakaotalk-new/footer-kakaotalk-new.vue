<template>
  <div class="pt-10" :class="'bg-white'">
    <div class="flex space-x-6 items-center px-10 pt-4 pb-2">
      <div>
        <div
          class="w-[72px] h-[72px] rounded-full flex justify-center items-center"
          :class="'bg-gray-100'"
        >
          <font-awesome-icon :icon="['fas', 'plus']" :class="'text-[45px]'" />
        </div>
      </div>
      <div class="flex-1">
        <input-common
          :placeholder="'Nhập tin nhắn'"
          v-model:value="value"
          :class="`custom-input`"
        >
          <template #suffix>
            <div class="mt-1">
              <img
                :src="'/smiley-light-mode.jpg'"
                alt="icon"
                class="w-[48px] object-contain"
              />
            </div>
          </template>
        </input-common>
      </div>
      <div>
        <img
          :src="'/audio-waves-light-mode.jpg'"
          alt="icon"
          class="w-[72px] h-[72px] rounded-full object-contain"
        />
      </div>
    </div>

    <div class="px-10 pb-8">
      <span
        class="block w-[300px] h-2 mx-auto mt-12 rounded-full"
        :class="'bg-black'"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const value = ref("");
</script>

<style scoped lang="scss"></style>
