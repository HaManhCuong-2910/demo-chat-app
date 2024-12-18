<template>
  <div class="grid grid-cols-4 gap-3 max-h-80 overflow-y-auto">
    <div
      v-for="item in data"
      :key="item"
      class="cursor-pointer"
      @click="emit('updateImage', item)"
    >
      <img :src="item" alt="icon" class="w-full h-full object-contain" />
    </div>
  </div>
</template>

<script setup lang="ts">
const data = ref([
  "/1.png",
  "/ico2.png",
  "/ico3.png",
  "/ico4.png",
  "/ico5.png",
  "/ico6.png",
  "/ico7.png",
  "/ico8.png",
  "/ico9.png",
  "/ico10.png",
  "/ico11.png",
  "/ico12.png",
  "/ico13.png",
]);

const emit = defineEmits(["updateImage"]);
</script>

<style scoped lang="scss"></style>
