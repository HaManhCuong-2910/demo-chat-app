<template>
  <div class="grid grid-cols-10 gap-2 mt-8">
    <div class="col-span-3">
      <features-zalo-component />
    </div>
    <div class="col-span-7 flex">
      <div>
        <chat-area-zalo-component />
      </div>
      <div>
        <dialog-add-edit-chat-zalo-component :is-add-normal="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
