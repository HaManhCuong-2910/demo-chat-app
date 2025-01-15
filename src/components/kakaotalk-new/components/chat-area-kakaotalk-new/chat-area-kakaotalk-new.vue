<template>
  <div class="container-chat-input">
    <div
      v-for="(item, index) in dataChats"
      :class="[
        index > 0
          ? item.isShowAvatar &&
            item.type === ETypeUserChat.other &&
            item.typeMessage !== ETypeAddChat.date
            ? 'mt-10'
            : 'mt-4'
          : '',
        'flex w-full',
      ]"
      :key="index"
      @contextmenu="onContextMenu($event, index)"
    >
      <chat-box-date v-if="item.typeMessage === ETypeAddChat.date" />

      <template v-else>
        <img
          v-if="item.type === ETypeUserChat.other && item.isShowAvatar"
          :src="avatars.other"
          alt="icon"
          class="min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] rounded-[28px] mr-6 -mt-2"
        />
        <div
          :class="[
            item.type === ETypeUserChat.other &&
              !item.isShowAvatar &&
              'ml-[121px]',
            'w-full',
          ]"
        >
          <div
            class="flex"
            :class="
              item.type === ETypeUserChat.user
                ? 'ml-auto justify-end items-end'
                : 'justify-start items-start'
            "
          >
            <p
              class="time-content whitespace-nowrap mb-1 mr-[18px]"
              :style="`font-size: 28px;font-weight: 500`"
              v-if="item.type === ETypeUserChat.user && item.isShowTime"
              contenteditable="true"
            >
              <span
                class="block text-end mb-3"
                :style="`font-size: 27px;font-weight: 500`"
                style="color: rgb(262, 228, 0)"
                contenteditable="true"
                >1
              </span>
              {{ moment(item.time).format(`h:mm`) }}
            </p>

            <chat-box-message
              v-if="item.typeMessage === ETypeAddChat.message"
              :data="item"
            />

            <chat-box-images
              v-if="item.typeMessage === ETypeAddChat.image"
              :data="item"
            />

            <chat-box-call
              v-if="
                [
                  ETypeAddChat.call_canceled,
                  ETypeAddChat.called,
                  ETypeAddChat.calling,
                  ETypeAddChat.video_call_black,
                  ETypeAddChat.video_call_green,
                ].includes(item.typeMessage)
              "
              :data="item"
            />

            <p
              v-if="item.type === ETypeUserChat.other && item.isShowTime"
              class="time-content self-end whitespace-nowrap mt-1 mb-1 ml-[18px]"
              :style="`font-size: 28px;font-weight: 500`"
              contenteditable="true"
            >
              <span
                class="block text-start mb-3"
                :style="`font-size: 27px;font-weight: 500`"
                style="color: rgb(262, 228, 0)"
                contenteditable="true"
                >1
              </span>
              {{ moment(item.time).format(`h:mm`) }}
            </p>
          </div>
        </div>
      </template>
    </div>

    <context-menu v-model:show="show" :options="options">
      <context-menu-item
        v-if="
          dataChats[dataContextMenu.index].replicaIndex === null &&
          (dataChats[dataContextMenu.index].typeMessage ===
            ETypeAddChat.message ||
            dataChats[dataContextMenu.index].typeMessage === ETypeAddChat.image)
        "
        label="REP"
        @click="onRepMessage"
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
