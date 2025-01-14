<template>
  <div>
    <h4 class="text-base font-medium">
      {{
        props.type === ETypeUserChat.user ? "Người nhắn đi" : "Người nhắn đến"
      }}
    </h4>

    <label
      v-if="props.type === ETypeUserChat.other"
      for="other_avatar"
      class="preview-image relative block w-20 h-20 mt-4 rounded-full"
    >
      <img
        :src="avatars.other"
        alt="avatar"
        class="w-full h-full rounded-full"
      />
    </label>
    <input
      v-if="props.type === ETypeUserChat.other"
      id="other_avatar"
      class="hidden"
      type="file"
      accept="image/*"
      @change="(event) => handleChange(event)"
    />

    <div class="mt-4 relative">
      <input-common
        :placeholder="'Nhập nội dung'"
        :type="'textarea'"
        v-model:value="data.message"
      >
      </input-common>

      <div
        class="container-images flex space-x-3"
        v-if="data.images.length > 0"
      >
        <img
          v-for="item in data.images"
          :key="item"
          :src="item"
          alt="images"
          class="object-contain h-full w-fit"
        />
      </div>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <label
        :for="`files_${props.type}`"
        class="py-1 px-4 text-white rounded-md bg-gray-500 cursor-pointer h-8"
        >Chọn ảnh</label
      >

      <input
        :id="`files_${props.type}`"
        type="file"
        accept="image/*"
        multiple
        hidden
        @change="(event: any)=> {
        if (!event.target?.files) return;
        [...event.target.files].forEach(preview);
      }"
      />

      <button-common :text="'Gửi'" :class-text="'font-medium text-base'" />
      <button-common
        :text="'Cuộc gọi thoại'"
        :class-text="'font-medium text-base'"
      />
      <button-common
        :text="'Kết thúc cuộc gọi'"
        :class-text="'font-medium text-base'"
      />
      <button-common
        :text="'Hủy cuộc gọi'"
        :class-text="'font-medium text-base'"
      />
      <button-common
        :text="'Cuộc gọi video 1'"
        :class-text="'font-medium text-base'"
      />
      <button-common
        :text="'Cuộc gọi video 2'"
        :class-text="'font-medium text-base'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypeUserChat } from "~/src/components/home/models/home.model";
import { useKakaotalkNewStore } from "../../stores/kakaotalk-new.store";
import { toBase64 } from "~/src/services/constant";

const { avatars } = storeToRefs(useKakaotalkNewStore());

const props = defineProps({
  type: String as PropType<ETypeUserChat>,
});

const data = ref<{
  message: string;
  images: string[];
}>({
  message: "",
  images: [],
});

const preview = (file: File) => {
  const fr = new FileReader();
  data.value.images = [];
  if (!!document.querySelector(`#files_${props.type}`)) {
    // @ts-ignore
    document.querySelector(`#files_${props.type}`).innerHTML = "";
  }

  fr.onload = () => {
    data.value.images.push(fr.result as string);
  };
  fr.readAsDataURL(file);
};

const handleChange = async (event: any) => {
  if (event.target.files[0]) {
    avatars.value.other = await toBase64(event.target.files[0]);
  }
};
</script>

<style scoped lang="scss">
.container-images {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}
</style>
