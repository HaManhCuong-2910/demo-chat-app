<template>
  <div class="container-chat-input">
    <div
      v-for="(item, index) in dataChats"
      :class="index > 0 && 'mt-5'"
      :key="index"
      @contextmenu="onContextMenu($event, index)"
    >
      <chat-box-message
        v-if="item.typeMessage === ETypeAddChat.message"
        :data="item"
      />
    </div>

    <context-menu v-model:show="show" :options="options">
      <context-menu-item
        v-if="
          dataChats[dataContextMenu.index].replicaIndex === null &&
          dataChats[dataContextMenu.index].typeMessage ===
            ETypeAddChat.message &&
          dataChats[dataContextMenu.index].typeMessage === ETypeAddChat.image
        "
        label="REP"
      />
      <context-menu-item label="Xóa" @click="onDelete" />
    </context-menu>
  </div>
</template>

<script setup lang="ts">
import {
  ETypeAddChat,
  ETypeUserChat,
} from "~/src/components/home/models/home.model";
import type { IChatsKakaotalkNew } from "../../models/kakaotalk-new.model";
import moment from "moment";
import { useChatKakaotalkNewStore } from "../../stores/chat-data-kakaotalk-new.store";
import type { MenuOptions } from "@imengyu/vue3-context-menu";
import { useKakaotalkNewStore } from "../../stores/kakaotalk-new.store";

const { avatars, isShowAvatar, isShowTime } = storeToRefs(
  useKakaotalkNewStore()
);
const { dataChats } = storeToRefs(useChatKakaotalkNewStore());

const show = ref(false);
const dataContextMenu = ref({
  index: 0,
});
const options = ref<MenuOptions>({
  zIndex: 3,
  minWidth: 230,
  x: 500,
  y: 200,
});

const onContextMenu = (event: MouseEvent, index: number) => {
  event.preventDefault();
  //Show component mode menu
  show.value = true;
  options.value.x = event.x;
  options.value.y = event.y;
  dataContextMenu.value = {
    index,
  };
};

const onDelete = () => {
  dataChats.value.splice(dataContextMenu.value.index, 1);
};

const onRepMessage = () => {
  dataChats.value.push({
    images: [],
    isShowAvatar: isShowAvatar.value,
    isShowTime: isShowTime.value,
    replicaIndex: dataContextMenu.value.index,
    time: moment().format("YYYY-MM-DD HH:mm"),
    type:
      dataChats.value[dataContextMenu.value.index].type === ETypeUserChat.user
        ? ETypeUserChat.other
        : ETypeUserChat.user,
    typeMessage: ETypeAddChat.message,
    value: "REP",
  });
};
</script>

<style scoped lang="scss"></style>
