<template>
  <div>
    <div class="grid grid-cols-3 gap-2 mt-11 w-full px-10">
      <div>
        <kakaotalk-new-left-side />
      </div>
      <div>
        <kakaotalk-new-screen />
      </div>
      <div>
        <kakaotalk-new-right-side />
        <button-common
          class="!rounded-xl mt-5"
          :type="ETypeButton.primaryWhite"
          @click="onDownload"
        >
          <div class="flex items-center">
            <p class="text-base">Tải xuống</p>
          </div>
        </button-common>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as htmlToImage from "html-to-image";
import { downloadFile, ETypeButton } from "../services/constant";

const onDownload = () => {
  const node = document.getElementById("container-kakaotalk-new");

  if (!node) return;
  htmlToImage
    .toPng(node, {
      style: {
        zoom: "1",
      },
    })
    .then((dataUrl) => {
      downloadFile(dataUrl, "capture.png");
    })
    .catch((error) => {
      console.log("error", error);
    });
};
</script>

<style scoped lang="scss"></style>
