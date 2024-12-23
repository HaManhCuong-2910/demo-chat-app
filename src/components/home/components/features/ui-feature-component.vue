<template>
  <div class="p-3 bg-gray-100 rounded-xl">
    <h3 class="text-center font-medium mb-4">Giao diện người dùng</h3>
    <div class="grid grid-cols-12 gap-1 items-center">
      <p class="text-base font-medium col-span-5">Nút trò chuyện</p>
      <div class="flex col-span-7">
        <button-common
          :text="'Trái'"
          :class="'!rounded-xl'"
          :class-text="'font-medium text-base'"
          :type="
            positionAddButton === EPositionToolbar.left
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="positionAddButton = EPositionToolbar.left"
        />
        <button-common
          :text="'Giữa'"
          :class="'!rounded-xl'"
          :class-text="'font-medium text-base'"
          :type="
            positionAddButton === EPositionToolbar.center
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="positionAddButton = EPositionToolbar.center"
        />
        <button-common
          :text="'Phải'"
          :class="'!rounded-xl'"
          :class-text="'font-medium text-base'"
          :type="
            positionAddButton === EPositionToolbar.right
              ? ETypeButton.primary
              : ETypeButton.secondary
          "
          @click="positionAddButton = EPositionToolbar.right"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypeButton } from "~/src/services/constant";
import { EPositionToolbar } from "../../models/toolbar.model";
import { useToolbarStore } from "../../store/toolbar.store";

const toolbarStore = useToolbarStore();
const { positionAddButton } = storeToRefs(toolbarStore);
</script>

<style scoped lang="scss"></style>
