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
        'flex w-full items-data-chat',
      ]"
      :data-index="index"
      :data-type="item.typeMessage"
      :key="index"
      @contextmenu="onContextMenu($event, index)"
    >
      <chat-box-date
        v-if="item.typeMessage === ETypeAddChat.date"
        :is-dark-mode="props.isDarkMode"
        :data="item"
      />

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
              :style="`font-size: 24px;font-weight: 500`"
              :class="props.isDarkMode ? 'text-[#888888]' : 'text-[#536573]'"
              v-if="item.type === ETypeUserChat.user && item.isShowTime"
              contenteditable="true"
            >
              {{
                moment(item.time)
                  .locale(language)
                  .format(`${language === "ko" ? "h:mm" : "h:mm"}`)
              }}
            </p>

            <chat-box-record
              v-if="item.typeMessage === ETypeAddChat.record"
              :data="item"
              :is-dark-mode="props.isDarkMode"
            />

            <chat-box-message
              v-if="item.typeMessage === ETypeAddChat.message"
              :data="item"
              :is-dark-mode="props.isDarkMode"
            />

            <chat-box-images
              v-if="item.typeMessage === ETypeAddChat.image"
              :data="item"
              :index="index"
              :is-dark-mode="props.isDarkMode"
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
              :is-dark-mode="props.isDarkMode"
            />

            <p
              v-if="item.type === ETypeUserChat.other && item.isShowTime"
              class="time-content self-end whitespace-nowrap mt-1 mb-1 ml-[18px]"
              :data-time="item.time"
              :class="props.isDarkMode ? 'text-[#888888]' : 'text-[#536573]'"
              :style="`font-size: 24px;font-weight: 500`"
              contenteditable="true"
            >
              {{
                moment(item.time)
                  .locale(language)
                  .format(`${language === "ko" ? "h:mm" : "h:mm"}`)
              }}
            </p>
          </div>
          <div
            class="flex space-x-2 mt-[10px] w-fit"
            :class="item.type === ETypeUserChat.user && 'ml-auto'"
          >
            <div
              v-for="iconItem in item.icons"
              :key="iconItem.type"
              :class="[
                'rounded-full py-3 px-4',
                isDarkMode ? 'bg-white' : 'bg-black bg-opacity-15',
              ]"
              contenteditable="true"
            >
              <div class="flex space-x-2 items-center">
                <img
                  :src="iconItem.src"
                  class="w-10"
                  alt="tim"
                  :class="iconItem.type === 'smile' && 'rotate-[12deg]'"
                />
                <span
                  class="text-[28px]"
                  :style="`${
                    isDarkMode ? 'color: #888888' : 'color: rgb(262, 228, 0)'
                  }`"
                  >{{ iconItem.count }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <context-menu v-model:show="show" :options="options">
      <context-menu-item>
        <div class="grid grid-cols-6 gap-4">
          <img
            v-for="item in dataIcons"
            :key="item.type"
            :src="item.src"
            alt="icon"
            class="w-6 cursor-pointer hover:scale-125 duration-300"
            @click="onAddIcon(item)"
          />
        </div>
      </context-menu-item>
      <context-menu-item
        v-if="dataContextMenu.index > 0"
        label="Lên"
        @click="onUp"
      />
      <context-menu-item
        v-if="dataContextMenu.index < dataChats.length - 1"
        label="Xuống"
        @click="onDown"
      />
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
      <context-menu-item
        label="Thêm tin nhắn lên trên"
        @click="
          () => {
            dataDialog.isShowDialog = true;
            dataDialog.typeUser = dataChats[dataContextMenu.index].type;
            dataDialog.typeQuickChat = ETypeQuickChat.above;
          }
        "
      />
      <context-menu-item
        label="Thêm tin nhắn xuống dưới"
        @click="
          () => {
            dataDialog.isShowDialog = true;
            dataDialog.typeUser = dataChats[dataContextMenu.index].type;
            dataDialog.typeQuickChat = ETypeQuickChat.under;
          }
        "
      />
    </context-menu>
  </div>

  <Teleport defer to="#dialog-add-message">
    <el-dialog destroy-on-close v-model="dataDialog.isShowDialog" :width="700">
      <div class="p-4">
        <div class="">
          <el-checkbox
            v-model="isShowAvatar"
            label="Hiện ảnh đại diện"
            size="large"
            class="bg-white"
            border
          />
          <el-checkbox
            v-model="isShowTime"
            label="Hiển thị thời gian"
            size="large"
            class="bg-white"
            border
          />
        </div>
        <input-date-kakaotalk-new @on-close="dataDialog.isShowDialog = false" />
        <div class="mt-4">
          <form-chat-left-side
            :type="ETypeUserChat.user"
            :index-above="dataContextMenu.index"
            :quick-add="dataDialog.typeQuickChat"
            @on-close="dataDialog.isShowDialog = false"
          />
        </div>
        <div class="mt-4">
          <form-chat-left-side
            :type="ETypeUserChat.other"
            :index-above="dataContextMenu.index"
            :quick-add="dataDialog.typeQuickChat"
            @on-close="dataDialog.isShowDialog = false"
          />
        </div>
      </div>
    </el-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import {
  ETypeAddChat,
  ETypeUserChat,
} from "~/src/components/home/models/home.model";
import moment from "moment/min/moment-with-locales";
import { useChatKakaotalkNewStore } from "../../stores/chat-data-kakaotalk-new.store";
import type { MenuOptions } from "@imengyu/vue3-context-menu";
import { useKakaotalkNewStore } from "../../stores/kakaotalk-new.store";
import { dataIcons, ETypeQuickChat } from "../../models/kakaotalk-new.model";

const props = defineProps({
  isDarkMode: Boolean,
});
const chatKakaotalkNewStore = useChatKakaotalkNewStore();
const { avatars, isShowAvatar, isShowTime, language } = storeToRefs(
  useKakaotalkNewStore()
);
const { dataChats } = storeToRefs(chatKakaotalkNewStore);
const dataDialog = ref({
  isShowDialog: false,
  typeUser: ETypeUserChat.user,
  typeQuickChat: ETypeQuickChat.under,
});
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

const onUp = () => {
  chatKakaotalkNewStore.updateDataChats();
  dataChats.value.splice(
    dataContextMenu.value.index,
    1,
    dataChats.value.splice(
      dataContextMenu.value.index - 1,
      1,
      dataChats.value[dataContextMenu.value.index]
    )[0]
  );
};

const onDown = () => {
  chatKakaotalkNewStore.updateDataChats();
  dataChats.value.splice(
    dataContextMenu.value.index,
    1,
    dataChats.value.splice(
      dataContextMenu.value.index + 1,
      1,
      dataChats.value[dataContextMenu.value.index]
    )[0]
  );
};

const onAddIcon = (item: { type: string; src: string }) => {
  const exitsIcons = dataChats.value[dataContextMenu.value.index].icons;

  for (let index = 0; index < exitsIcons.length; index++) {
    const icon = exitsIcons[index];
    if (icon.type === item.type) {
      dataChats.value[dataContextMenu.value.index].icons.splice(index, 1);
      return;
    }
  }

  dataChats.value[dataContextMenu.value.index].icons.push({
    ...item,
    count: 1,
  });
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
    icons: [],
  });
};
</script>

<style scoped lang="scss"></style>
