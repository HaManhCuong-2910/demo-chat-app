<template>
  <div>
    <button-common
      :text="'Thêm mới'"
      :class="'!rounded-xl'"
      :class-text="'font-medium text-base'"
      @click="handleAdd"
    />
  </div>
</template>

<script setup lang="ts">
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";

const { data: listData, dataDialog } = storeToRefs(useListZaloChatStore());

const handleAdd = () => {
  dataDialog.value.isEdit = false;
  dataDialog.value.isShowDialog = true;
};
</script>

<style scoped lang="scss"></style>
