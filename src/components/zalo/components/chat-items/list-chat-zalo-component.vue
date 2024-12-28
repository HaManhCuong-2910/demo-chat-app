<template>
  <div class="px-4 pr-[18px] pb-4">
    <div v-for="(item, index) in dataShow">
      <el-tooltip
        v-if="mode === EModeAction.edit"
        :placement="item.type === ETypeUserChat.user ? 'right' : 'left'"
      >
        <div>
          <container-all-chat-component :index="index" :item="item" />
        </div>
        <template #content>
          <tooltip-item-chat-zalo-component :index="index" />
        </template>
      </el-tooltip>

      <template v-if="mode === EModeAction.preview">
        <div>
          <container-all-chat-component :index="index" :item="item" />
        </div>
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
