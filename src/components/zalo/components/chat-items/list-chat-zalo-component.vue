<template>
  <div class="px-4 pr-[18px] pb-4">
    <div v-for="(item, index) in dataShow">
      <el-tooltip
        v-if="mode === EModeAction.edit"
        :placement="item.type === ETypeUserChat.user ? 'right' : 'left'"
      >
        <business-card-zalo-component
          v-if="item.typeMessage === ETypeMessage.danhthiep"
          :key="item.value"
          :data="item"
          :index="index"
        />
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

        <date-item-zalo-component
          v-if="item.typeMessage === ETypeMessage.date"
        />
        <template #content>
          <tooltip-item-chat-zalo-component :index="index" />
        </template>
      </el-tooltip>

      <template v-if="mode === EModeAction.preview">
        <business-card-zalo-component
          v-if="item.typeMessage === ETypeMessage.danhthiep"
          :key="item.value"
          :data="item"
          :index="index"
        />
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

        <date-item-zalo-component
          v-if="item.typeMessage === ETypeMessage.date"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EModeAction } from "~/src/components/home/models/home.model";
import {
  ETypeMessage,
  ETypeUserChat,
  type IDataZaloChat,
} from "../../models/chat.model";
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";
import { useZaloChatAreaStore } from "../../stores/zalo-chat-area.store";

const { data: listData, dataDialog } = storeToRefs(useListZaloChatStore());
const configZaloChatStore = useConfigZaloChatStore();
const zaloChatAreaStore = useZaloChatAreaStore();
const { mode } = storeToRefs(zaloChatAreaStore);
const { showChatList } = storeToRefs(configZaloChatStore);
const dataShow = computed(() => {
  const copyData: IDataZaloChat[] = [];
  for (
    let index = 0;
    index < JSON.parse(JSON.stringify(listData.value)).length;
    index++
  ) {
    if (index === showChatList.value) {
      break;
    }
    const item = JSON.parse(JSON.stringify(listData.value))[index];
    copyData.push(item);
  }
  return copyData;
});
</script>

<style scoped lang="scss"></style>
