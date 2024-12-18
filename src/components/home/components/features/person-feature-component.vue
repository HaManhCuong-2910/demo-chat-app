<template>
  <div class="p-3 bg-gray-100 rounded-xl">
    <h3 class="text-center font-medium mb-4">Person</h3>
    <div>
      <div
        class="bg-[#0048bd] py-1 text-center text-white rounded-t-xl font-medium"
      >
        Me
      </div>
      <div class="bg-white p-2 grid grid-cols-2">
        <div class="flex items-center">
          <label for="user_avatar" class="preview-image relative w-20 h-20">
            <img
              :src="avatars.user"
              alt="avatar"
              class="w-full h-full object-contain"
            />
            <font-awesome-icon
              :icon="['fas', 'pen-to-square']"
              class="absolute right-0 bottom-0"
            />
          </label>
          <p class="text-base font-medium ml-2">Name</p>
          <input
            id="user_avatar"
            class="hidden"
            type="file"
            accept="image/*"
            @change="(event) => handleChange(event, 'user')"
          />
        </div>
        <div class="flex items-center">
          <input-common
            v-model:value="names.user"
            class="custom-input"
          ></input-common>
        </div>
      </div>
    </div>

    <div>
      <div
        class="bg-[#0048bd] py-1 text-center text-white rounded-t-xl font-medium mt-3"
      >
        Other
      </div>
      <div class="bg-white p-2 grid grid-cols-2">
        <div class="flex items-center">
          <label for="other_avatar" class="preview-image relative w-20 h-20">
            <img
              :src="avatars.other"
              alt="avatar"
              class="w-full h-full object-contain"
            />
            <font-awesome-icon
              :icon="['fas', 'pen-to-square']"
              class="absolute right-0 bottom-0"
            />
          </label>
          <p class="text-base font-medium ml-2">Name</p>
          <input
            id="other_avatar"
            class="hidden"
            type="file"
            accept="image/*"
            @change="(event) => handleChange(event, 'other')"
          />
        </div>
        <div class="flex items-center">
          <input-common
            v-model:value="names.other"
            class="custom-input"
          ></input-common>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToolbarStore } from "../../store/toolbar.store";

const toolbarStore = useToolbarStore();
const { avatars, names } = storeToRefs(toolbarStore);

const handleChange = (event: any, type: "user" | "other") => {
  if (event.target.files[0]) {
    avatars.value[type] = window.webkitURL.createObjectURL(
      event.target.files[0]
    );
  }
};
</script>

<style scoped lang="scss">
:deep(.custom-input) {
  .el-input__wrapper {
    @apply bg-gray-100;

    .el-input__inner {
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }
  }
}
</style>
