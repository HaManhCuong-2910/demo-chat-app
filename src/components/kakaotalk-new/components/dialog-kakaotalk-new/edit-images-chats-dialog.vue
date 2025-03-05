<template>
  <div class="p-10">
    <el-upload
      class="upload-demo"
      drag
      :auto-upload="false"
      :show-file-list="false"
      multiple
      :on-change="handleChange"
    >
      <div class="el-upload__text">
        Hoặc thả file tại đây hoặc <em>click để tải file</em>
      </div>
    </el-upload>

    <div class="grid grid-cols-4 gap-4 mt-4" v-if="data.length > 0">
      <div v-for="(item, index) in data" :key="item">
        <div class="text-center" v-if="data.length > 1">
          <el-icon class="cursor-pointer" @click="onDelete(index)"
            ><Delete class="text-red-500"></Delete
          ></el-icon>
        </div>
        <img :src="item" alt="image" />
      </div>
    </div>

    <div class="text-center mt-8">
      <button-common
        :text="'Xác nhận'"
        @click="props.onConfirm && props.onConfirm(data)"
      ></button-common>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadProps } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
const props = defineProps({
  images: Array as PropType<string[]>,
  onConfirm: Function as PropType<(...args: any[]) => any>,
});

const data = ref((JSON.parse(JSON.stringify(props.images)) as string[]) || []);

const handleChange: UploadProps["onChange"] = async (
  uploadFile,
  uploadFiles
) => {
  if (!uploadFile.raw) return;
  const fr = new FileReader();
  fr.onload = () => {
    data.value.push(fr.result as string);
    fr.abort();
  };
  fr.readAsDataURL(uploadFile.raw);
};

const onDelete = (indexDelete: number) => {
  data.value.splice(indexDelete, 1);
};
</script>

<style scoped lang="scss"></style>
