<template>
  <div
    class="py-[18px] px-6 rounded-3xl text-[35px] text-white flex items-center w-fit mx-auto mt-12 mb-7"
    :class="props.isDarkMode ? 'bg-[#2d2d2d]' : 'bg-black bg-opacity-15'"
  >
    <font-awesome-icon
      :icon="['far', 'calendar-days']"
      class="text-[36px] text-white mr-3"
    />
    <p class="text-[35px] text-white data-value" contenteditable="true">
      {{ props.data.value }}
    </p>
    <font-awesome-icon
      :icon="['fas', 'chevron-right']"
      class="text-[35px] text-white ml-3 mt-[2px]"
    />
  </div>
</template>

<script setup lang="ts">
import type { IChatsKakaotalkNew } from "../../models/kakaotalk-new.model";

const props = defineProps({
  isDarkMode: Boolean,
  data: {
    type: Object as PropType<IChatsKakaotalkNew>,
    required: true,
  },
});
</script>

<style scoped lang="scss"></style>
