<template>
  <div :style="`width: ${widthPercent}%; margin: auto`">
    <div
      id="chat-area"
      :class="[
        mode === EModeAction.fullScreen
          ? 'fixed top-0 left-0 right-0 bottom-0 z-10'
          : '',
      ]"
      :style="`background-color: ${bgColor};`"
    >
      <div
        class="status-bar-container px-4 grid grid-cols-2 py-1"
        v-if="statusBar"
      >
        <p class="text-base font-medium">
          {{ moment(currentDate).format("HH:mm") }}
        </p>
        <div class="text-end flex space-x-1 justify-end items-center">
          <img
            src="/reception.svg"
            alt="icon"
            class="w-[18.15px] object-contain"
          />
          <img src="/wifi.svg" alt="icon" class="w-[16px] object-contain" />
          <svg
            width="26"
            height="12"
            viewBox="0 0 26 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute right-[-2px] top-[2px]"
          >
            <g clip-path="url(#clip0_0_3)">
              <path
                opacity="0.44"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.0741 4.07407L24.5169 4.36934C25.1427 4.78648 25.5185 5.48873 25.5185 6.24074C25.5185 6.99275 25.1427 7.695 24.5169 8.11214L24.0741 8.40741V4.07407ZM1.92593 0.703703H21.1852C22.2489 0.703703 23.1111 1.56597 23.1111 2.62963V9.85185C23.1111 10.9155 22.2489 11.7778 21.1852 11.7778H1.92593C0.862266 11.7778 0 10.9155 0 9.85185V2.62963C0 1.56597 0.862266 0.703703 1.92593 0.703703ZM1.92593 1.66667C1.3941 1.66667 0.962963 2.0978 0.962963 2.62963V9.85185C0.962963 10.3837 1.3941 10.8148 1.92593 10.8148H21.1852C21.717 10.8148 22.1481 10.3837 22.1481 9.85185V2.62963C22.1481 2.0978 21.717 1.66667 21.1852 1.66667H1.92593Z"
                fill="black"
              />
              <path
                :d="`M2.3125 3H${
                  (battery / 100) * 21
                }V10H2.3125C2.13991 10 2 9.58213 2 9.06667V3.93333C2 3.41787 2.13991 3 2.3125 3Z`"
                :fill="`${battery <= 20 ? 'red' : 'black'}`"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_3">
                <rect width="26" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div class="header-chat grid grid-cols-4 p-4 text-center">
        <img src="/arrow-left.svg" alt="icon" class="w-6" />
        <div class="col-span-2 text-center">
          <h3 class="text-xl font-medium">{{ names.other }}</h3>
        </div>
        <div class="flex justify-end space-x-4 items-center mr-4">
          <img
            :src="'/icon-search.svg'"
            alt="icon"
            class="w-4 object-contain"
          />
          <font-awesome-icon :icon="['fas', 'bars']" class="text-xl" />
        </div>
      </div>

      <div
        :style="`height: ${
          mode === EModeAction.fullScreen
            ? 'calc(100vh - 92px)'
            : fixHeight
            ? `${ratioH * (797 + 92)}px`
            : '100%'
        }; ${!fixHeight ? `min-height: ${ratioH * (797 + 92)}px;` : ''}`"
        class="relative overflow-y-hidden"
        @click="
          mode === EModeAction.fullScreen
            ? (mode = EModeAction.edit)
            : undefined
        "
      >
        <div
          class="h-full px-4 py-3 pb-[120px] hide-webkit-scrollbar"
          :style="`transform: translateY(${
            (scrollChat / 100) * ratioH * (797 + 92 + 200) * -1
          }px);`"
        >
          <div v-for="(item, index) in dataShow" :key="item.time">
            <div
              v-if="index > 0 && showDate"
              class="bg-black bg-opacity-15 py-1 px-3 rounded-xl text-xs text-white flex items-center w-fit mx-auto mt-2"
            >
              <font-awesome-icon
                :icon="['far', 'calendar-days']"
                class="text-sm text-white mr-1"
              />
              {{ moment(item.time).locale(language).format("dddd, LL") }}
              <font-awesome-icon
                :icon="['fas', 'chevron-right']"
                class="text-xs text-white ml-1"
              />
            </div>
            <div
              class="container-item-child flex items-center"
              v-for="(itemChild, indexChild) in item.chats"
            >
              <div
                v-if="mode === EModeAction.edit"
                class="bg-red-300 rounded-full flex justify-center items-center w-7 h-7 mr-2 cursor-pointer"
                @click="homeStore.onDeleteData(indexChild, index)"
              >
                <font-awesome-icon :icon="['fas', 'minus']" class="w-4 h-4" />
              </div>
              <div
                v-if="itemChild.typeMessage !== ETypeAddChat.image"
                :class="[itemChild.type, indexChild > 0 && 'mt-2']"
                :key="itemChild.value"
                @click="
                  () => {
                    if (mode === EModeAction.edit) {
                      isShowDialog = true;
                      isEditDialog = true;
                      dataDialogAdd.index = indexChild;
                      dataDialogAdd.indexParent = index;
                    }
                  }
                "
              >
                <p
                  class="!leading-3 time-content whitespace-nowrap"
                  :style="`font-size: ${Math.max(textSize - 5, 11)}px`"
                  v-if="itemChild.type === ETypeUserChat.user"
                >
                  <span
                    v-if="
                      showOnRead &&
                      indexChild === item.chats.length - 1 &&
                      index === dataShow.length - 1
                    "
                    class="block !leading-3 text-end"
                    :style="`font-size: ${Math.max(textSize - 5, 11)}px`"
                    style="color: rgb(254, 240, 27)"
                    >1
                  </span>
                  {{
                    indexChild ===
                    homeStore.onCheckFirstLastInChats(
                      item.chats,
                      ETypeUserChat.user
                    ).last
                      ? moment(itemChild.time).format("h:mm A")
                      : ""
                  }}
                </p>
                <img
                  v-if="
                    itemChild.type === ETypeUserChat.other &&
                    (indexChild > 0
                      ? item.chats[indexChild - 1].type !== ETypeUserChat.other
                      : true)
                  "
                  :src="avatars.other"
                  alt="icon"
                  class="min-w-10 max-w-10 min-h-10 max-h-10 rounded-full mr-2 mt-1"
                />
                <div
                  :class="
                    itemChild.type === ETypeUserChat.other &&
                    (indexChild > 0
                      ? item.chats[indexChild - 1].type === ETypeUserChat.other
                      : false) &&
                    'ml-12'
                  "
                >
                  <p
                    v-if="
                      itemChild.type === ETypeUserChat.other &&
                      (indexChild > 0
                        ? item.chats[indexChild - 1].type !==
                          ETypeUserChat.other
                        : true)
                    "
                    class="mb-[2px]"
                    :style="`font-size: ${textSize - 3}px`"
                  >
                    {{ names.other }}
                  </p>
                  <div
                    class="w-fit content min-h-7"
                    :style="`font-size: ${textSize}px`"
                  >
                    <i
                      class="fa-solid fa-phone text-green-600 inline -mb-[1px] mr-2"
                    ></i>
                    <font-awesome-icon
                      v-if="
                        [ETypeAddChat.calling, ETypeAddChat.called].includes(
                          itemChild.typeMessage
                        )
                      "
                      :icon="['fas', 'phone']"
                      :class="`${
                        itemChild.typeMessage === ETypeAddChat.calling
                          ? 'text-green-600'
                          : ''
                      } inline -mb-[1px] ${
                        itemChild.typeMessage === ETypeAddChat.called
                          ? 'mr-12'
                          : 'mr-2'
                      }  phone-icon`"
                      :style="[`font-size: ${textSize + 5}px`]"
                    />
                    {{ itemChild.value }}
                    <svg
                      v-if="
                        itemChild.type === ETypeUserChat.user &&
                        (indexChild > 0
                          ? item.chats[indexChild - 1].type !==
                            ETypeUserChat.user
                          : true)
                      "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22.23 42.69"
                      class="w-2 absolute right-[-2px] top-[2px]"
                      style="fill: rgb(254, 240, 27)"
                    >
                      <g data-name="Layer 2">
                        <path
                          class="kakao_tail_svg__cls-1"
                          d="M22.23.08s-7.59-1.37-15 7.05C-.74 16.13 0 21.65 0 21.65v21h16.45s.05-21.9.05-26.56c0-6.22 1.62-10.33 5.73-16.01Z"
                          data-name="Layer 1"
                        ></path>
                      </g>
                    </svg>
                    <svg
                      v-if="
                        itemChild.type === ETypeUserChat.other &&
                        (indexChild > 0
                          ? item.chats[indexChild - 1].type !==
                            ETypeUserChat.other
                          : true)
                      "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22.23 42.69"
                      class="w-2 absolute left-[-2px] top-[2px]"
                      style="fill: rgb(255, 255, 255); transform: scaleX(-1)"
                    >
                      <g data-name="Layer 2">
                        <path
                          class="kakao_tail_svg__cls-1"
                          d="M22.23.08s-7.59-1.37-15 7.05C-.74 16.13 0 21.65 0 21.65v21h16.45s.05-21.9.05-26.56c0-6.22 1.62-10.33 5.73-16.01Z"
                          data-name="Layer 1"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <p
                  v-if="
                    itemChild.type === ETypeUserChat.other &&
                    indexChild ===
                      homeStore.onCheckFirstLastInChats(
                        item.chats,
                        ETypeUserChat.other
                      ).last
                  "
                  class="time-content self-end whitespace-nowrap mt-10"
                  :style="`font-size: ${Math.max(textSize - 5, 11)}px`"
                >
                  <span
                    v-if="
                      showOnRead &&
                      indexChild === item.chats.length - 1 &&
                      index === dataShow.length - 1
                    "
                    class="block !leading-3 text-start"
                    :style="`font-size: ${Math.max(textSize - 5, 11)}px`"
                    style="color: rgb(254, 240, 27)"
                    >1
                  </span>
                  {{ moment(itemChild.time).format("h:mm A") }}
                </p>
              </div>

              <div
                v-if="itemChild.typeMessage === ETypeAddChat.image"
                :class="[itemChild.type, indexChild > 0 && 'mt-2']"
                @click="
                  isShowDialog = true;
                  isEditDialog = true;
                  dataDialogAdd.index = indexChild;
                  dataDialogAdd.indexParent = index;
                "
              >
                <p
                  class="!leading-3 time-content whitespace-nowrap mr-2"
                  :style="`font-size: ${Math.max(textSize - 5, 11)}px`"
                  v-if="itemChild.type === ETypeUserChat.user"
                >
                  <span
                    v-if="
                      showOnRead &&
                      indexChild === item.chats.length - 1 &&
                      index === dataShow.length - 1
                    "
                    class="block !leading-3 text-end"
                    :style="`font-size: ${Math.max(textSize - 5, 11)}px`"
                    style="color: rgb(254, 240, 27)"
                    >1</span
                  >
                  {{ moment(itemChild.time).format("h:mm A") }}
                </p>
                <img
                  v-if="itemChild.type === ETypeUserChat.other"
                  :src="avatars.other"
                  alt="icon"
                  class="min-w-10 max-w-10 min-h-10 max-h-10 rounded-full mr-2 mt-1"
                />
                <div class="relative">
                  <p
                    v-if="itemChild.type === ETypeUserChat.other"
                    class="mb-[2px]"
                    :style="`font-size: ${textSize - 3}px`"
                  >
                    {{ names.other }}
                  </p>
                  <div
                    :class="`w-9 h-9 rounded-full bg-slate-400 flex justify-center items-center absolute top-1/2 ${
                      itemChild.type === ETypeUserChat.user
                        ? 'right-full'
                        : 'left-[110%]'
                    } -translate-x-1/2`"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'arrow-up-from-bracket']"
                      class="text-white text-lg"
                    />
                  </div>

                  <img
                    :src="itemChild.value"
                    alt="image"
                    class="max-w-full rounded-xl ml-1"
                  />
                </div>
                <p
                  v-if="itemChild.type === ETypeUserChat.other"
                  class="time-content self-end whitespace-nowrap ml-3 mt-10"
                  :style="`font-size: ${Math.max(textSize - 5, 11)}px`"
                >
                  <span
                    v-if="
                      showOnRead &&
                      indexChild === item.chats.length - 1 &&
                      index === dataShow.length - 1
                    "
                    class="block !leading-3 text-start"
                    :style="`font-size: ${Math.max(textSize - 5, 11)}px`"
                    style="color: rgb(254, 240, 27)"
                    >1
                  </span>
                  {{ moment(itemChild.time).format("h:mm A") }}
                </p>
              </div>
              <div
                class="flex flex-col ml-2 mt-2 self-end justify-self-end"
                v-if="mode === EModeAction.edit"
              >
                <font-awesome-icon
                  :icon="['fas', 'arrow-up']"
                  class="p-1 bg-white text-xs rounded-t-full cursor-pointer"
                  @click="homeStore.switchData(indexChild, index, 'up')"
                />
                <font-awesome-icon
                  :icon="['fas', 'arrow-down']"
                  class="p-1 bg-white text-xs border-t border-b border-t-gray-300 border-b-gray-300 cursor-pointer"
                  @click="homeStore.switchData(indexChild, index, 'down')"
                />
                <font-awesome-icon
                  :icon="['fas', 'plus']"
                  class="p-1 text-xs rounded-b-full bg-green-300 cursor-pointer"
                  @click="
                    isShowDialog = true;
                    isAddAfterDialog = true;
                    dataDialogAdd.index = indexChild;
                    dataDialogAdd.indexParent = index;
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 w-full" v-if="footer">
          <chat-input-area-component />
        </div>
      </div>
    </div>
    <div class="text-center py-4">
      <button-common
        v-if="mode === EModeAction.preview"
        class="!rounded-xl"
        :type="ETypeButton.primaryWhite"
        @click="onDownload"
      >
        <div class="flex items-center">
          <p class="text-base">Download</p>
        </div>
      </button-common>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment/min/moment-with-locales";
import {
  EModeAction,
  ETypeAddChat,
  ETypeUserChat,
  type IHomeData,
} from "../models/home.model";
import { useHomeStore } from "../store/home.store";
import { downloadFile, ETypeButton } from "~/src/services/constant";
import * as htmlToImage from "html-to-image";
import { useToolbarStore } from "../store/toolbar.store";

const toolbarStore = useToolbarStore();
const homeStore = useHomeStore();
const {
  data,
  isShowDialog,
  isAddAfterDialog,
  isEditDialog,
  dataDialogAdd,
  mode,
} = storeToRefs(homeStore);
const {
  language,
  avatars,
  names,
  statusBar,
  battery,
  currentDate,
  showDate,
  bgColor,
  widthPercent,
  ratioH,
  textSize,
  footer,
  fixHeight,
  scrollChat,
  showChatList,
  showOnRead,
} = storeToRefs(toolbarStore);

const onDownload = () => {
  const node = document.getElementById("chat-area");

  if (!node) return;
  htmlToImage
    .toPng(node)
    .then((dataUrl) => {
      downloadFile(dataUrl, "capture.png");
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const dataShow = computed(() => {
  let indexShow = 0,
    isBreak = false;

  const copyData: IHomeData[] = [];
  for (
    let index = 0;
    index < JSON.parse(JSON.stringify(data.value)).length;
    index++
  ) {
    if (isBreak) {
      break;
    }
    const element = JSON.parse(JSON.stringify(data.value))[index];
    copyData.push(element);
    copyData[index].chats = [];
    for (
      let j = 0;
      j < JSON.parse(JSON.stringify(data.value))[index].chats.length;
      j++
    ) {
      indexShow++;
      const chatItem = JSON.parse(JSON.stringify(data.value))[index].chats[j];
      copyData[index].chats.push(chatItem);

      if (indexShow === showChatList.value) {
        isBreak = true;
        break;
      }
    }
  }
  return copyData;
});
</script>

<style scoped lang="scss">
.user {
  max-width: 65%;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  .content {
    @apply py-[7px] px-3 rounded-xl relative;
    background-color: rgb(254, 240, 27);
    margin-left: 8px;
    word-wrap: break-word;
    max-width: 100%;
  }

  img {
    margin-left: auto;
  }
}

.other {
  max-width: 65%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .content {
    @apply py-[7px] px-3 rounded-xl relative;
    background-color: rgb(255, 255, 255);
    word-wrap: break-word;
    max-width: 100%;
    margin-right: 8px;
  }
}
</style>
