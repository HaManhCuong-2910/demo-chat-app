<template>
  <div class="p-4">
    <div v-for="(item, index) in listData">
      <el-tooltip
        :placement="item.type === ETypeUserChat.user ? 'right' : 'left'"
      >
        <item-chat-zalo-component
          v-if="item.typeMessage === ETypeMessage.message"
          :key="item.value"
          :data="item"
          :index="index"
        />
        <image-item-zalo-component
          v-if="
            item.typeMessage === ETypeMessage.image ||
            item.typeMessage === ETypeMessage.emoji
          "
          :key="item.value"
          :data="item"
          :index="index"
        />

        <call-item-zalo-component
          v-if="
            [
              ETypeMessage.call,
              ETypeMessage.comeVideo,
              ETypeMessage.missVideo,
              ETypeMessage.refuseVideo,
            ].includes(item.typeMessage)
          "
          :key="item.value"
          :data="item"
          :index="index"
        />

        <template #content>
          <tooltip-item-chat-zalo-component :index="index" />
        </template>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypeMessage, ETypeUserChat } from "../../models/chat.model";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";

const { data: listData, dataDialog } = storeToRefs(useListZaloChatStore());

const onEdit = (index: number) => {
  dataDialog.value.isShowDialog = true;
  dataDialog.value.isEdit = true;
  dataDialog.value.index = index;
};
</script>

<style scoped lang="scss"></style>
