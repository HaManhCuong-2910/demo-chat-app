<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <button-common
        :text="'Thêm mới'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
        @click="handleAdd"
      />
      <button-common
        :text="'Download'"
        :class="'!rounded-xl'"
        :class-text="'font-medium text-base'"
        @click="handleDownload"
      />
    </div>
    <name-avatar-zalo-component />
    <preview-config-zalo-component />
  </div>
</template>

<script setup lang="ts">
import * as htmlToImage from "html-to-image";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";
import { downloadFile } from "~/src/services/constant";
import { useZaloChatAreaStore } from "../../stores/zalo-chat-area.store";
import { ElLoading } from "element-plus";
const { data: listData, dataDialog } = storeToRefs(useListZaloChatStore());
const { dataPerson } = storeToRefs(useZaloChatAreaStore());

const handleAdd = () => {
  dataDialog.value.isEdit = false;
  dataDialog.value.isShowDialog = true;
};

const handleDownload = () => {
  const node = document.getElementById("chat-area");
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  if (!node) return;
  htmlToImage
    .toPng(node)
    .then((dataUrl) => {
      downloadFile(dataUrl, "capture.png");
      loading.close();
    })
    .catch((error) => {
      ElMessage({
        message: "Đã xảy ra lỗi, vui lòng thử lại",
        type: "warning",
      });
      loading.close();
    });
};
</script>

<style scoped lang="scss"></style>
