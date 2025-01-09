<template>
  <div :style="`width: ${widthPercent}%; margin: auto`">
    <div
      id="chat-area"
      :class="[
        mode === EModeAction.fullScreen
          ? 'fixed top-0 left-0 right-0 bottom-0 z-10'
          : 'relative',
      ]"
      :style="`background-color: ${isDarkMode ? '#080808' : bgColor};`"
    >
      <div
        class="absolute top-0 left-0 w-full z-10 header-container"
        :style="`background-color: ${isDarkMode ? '#080808' : bgColor}F2;`"
      >
        <div v-if="statusBar">
          <status-bar-android
            v-if="userInterface === EUserInterface.android"
            :is-dark-mode="isDarkMode"
          />
          <status-bar-ios v-else :is-dark-mode="isDarkMode" />
        </div>

        <div class="header-chat grid grid-cols-12 p-4 text-center items-center">
          <svg
            v-if="userInterface === EUserInterface.ios"
            width="12"
            height="24"
            viewBox="0 0 12 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.05306 12L11.7572 1.52762C12.0873 1.17137 12.0799 0.601572 11.7406 0.254947C11.4013 -0.0916775 10.8586 -0.083872 10.5285 0.272381L0.242806 11.3724C-0.0809354 11.7218 -0.0809354 12.2782 0.242806 12.6276L10.5285 23.7276C10.8586 24.0839 11.4013 24.0917 11.7406 23.7451C12.0799 23.3984 12.0873 22.8286 11.7572 22.4724L2.05306 12Z"
              :fill="isDarkMode ? 'white' : 'black'"
            />
          </svg>

          <svg
            v-else
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.8377 12H2.16229M2.16229 12L11.4534 2.70886M2.16229 12L11.4534 21.2912"
              :stroke="isDarkMode ? 'white' : 'black'"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div
            class="col-span-10"
            :class="userInterface === EUserInterface.android && 'text-left'"
          >
            <h3 class="text-xl font-medium" :class="isDarkMode && 'text-white'">
              {{ names.other }}
            </h3>
          </div>
          <div class="flex justify-end space-x-4 items-center mr-2">
            <font-awesome-icon
              :icon="['fas', 'magnifying-glass']"
              class="text-[18px]"
              :class="isDarkMode && 'text-white'"
            />
            <font-awesome-icon
              :icon="['fas', 'bars']"
              class="text-xl"
              :class="isDarkMode && 'text-white'"
            />
          </div>
        </div>
      </div>

      <div
        :style="`height: ${
          mode === EModeAction.fullScreen
            ? '100vh'
            : fixHeight
            ? `${ratioH * (797 + 92 + 92)}px`
            : '100%'
        }; ${!fixHeight ? `min-height: ${ratioH * (797 + 92 + 92)}px;` : ''}`"
        class="relative overflow-y-hidden pt-[92px]"
        @click="
          mode === EModeAction.fullScreen
            ? (mode = EModeAction.edit)
            : undefined
        "
      >
        <div
          class="h-full px-4 py-3 pb-[150px] hide-webkit-scrollbar"
          :style="`transform: translateY(${
            (scrollChat / 100) * ratioH * (797 + 92 + 92 + 200) * -1
          }px);`"
        >
          <div v-for="(item, index) in dataShow" :key="item.time">
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
                v-if="showDate && itemChild.typeMessage === ETypeAddChat.date"
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
                class="py-1 px-3 rounded-xl text-xs text-white flex items-center w-fit mx-auto mt-5 mb-3"
                :class="isDarkMode ? 'bg-[#2d2d2d]' : 'bg-black bg-opacity-15'"
              >
                <font-awesome-icon
                  :icon="['far', 'calendar-days']"
                  class="text-sm text-white mr-1"
                />
                {{ itemChild.value }}
                <font-awesome-icon
                  :icon="['fas', 'chevron-right']"
                  class="text-xs text-white ml-1"
                />
              </div>
              <div
                v-if="
                  itemChild.typeMessage !== ETypeAddChat.image &&
                  itemChild.typeMessage !== ETypeAddChat.date
                "
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
                  :class="isDarkMode && 'text-[#888888]'"
                  :style="`font-size: ${Math.max(
                    textSize - 5,
                    11
                  )}px;font-weight: ${fontWeight}`"
                  v-if="
                    itemChild.type === ETypeUserChat.user &&
                    itemChild.isShowTime
                  "
                >
                  <span
                    v-if="
                      showOnRead &&
                      indexChild === item.chats.length - 1 &&
                      index === dataShow.length - 1
                    "
                    class="block !leading-3 text-end"
                    :style="`font-size: ${Math.max(
                      textSize - 5,
                      11
                    )}px;font-weight: ${fontWeight}`"
                    style="color: rgb(262, 228, 0)"
                    >1
                  </span>
                  {{
                    moment(itemChild.time)
                      .locale(language)
                      .format(`${language === "ko" ? "A h:mm" : "h:mm"}`)
                  }}
                </p>
                <img
                  v-if="
                    itemChild.type === ETypeUserChat.other &&
                    itemChild.isShowAvatar
                  "
                  :src="avatars.other"
                  alt="icon"
                  class="min-w-10 max-w-10 min-h-10 max-h-10 rounded-xl mr-3 mt-1"
                />
                <div
                  :class="
                    itemChild.type === ETypeUserChat.other &&
                    !itemChild.isShowAvatar &&
                    'ml-[52px]'
                  "
                >
                  <p
                    v-if="
                      itemChild.type === ETypeUserChat.other &&
                      itemChild.isShowAvatar
                    "
                    class="mb-[2px]"
                    :style="`font-size: ${textSize - 3}px`"
                  >
                    {{ names.other }}
                  </p>
                  <div class="flex items-end">
                    <div
                      class="w-fit content min-h-7"
                      :style="`font-size: ${textSize}px;font-weight: ${fontWeight}`"
                    >
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
                          itemChild.isShowAvatar
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 22.23 42.69"
                        class="w-2 absolute right-[-2px] top-[2px]"
                        style="fill: rgb(262, 228, 0)"
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
                          itemChild.isShowAvatar
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

                    <p
                      v-if="
                        itemChild.type === ETypeUserChat.other &&
                        itemChild.isShowTime
                      "
                      class="time-content self-end whitespace-nowrap mt-1"
                      :class="isDarkMode && 'text-[#888888]'"
                      :style="`font-size: ${Math.max(
                        textSize - 5,
                        11
                      )}px; transform: translateY(4px);font-weight: ${fontWeight}`"
                    >
                      <span
                        v-if="
                          showOnRead &&
                          indexChild === item.chats.length - 1 &&
                          index === dataShow.length - 1
                        "
                        class="block !leading-3 text-start"
                        :style="`font-size: ${Math.max(
                          textSize - 5,
                          11
                        )}px;font-weight: ${fontWeight}`"
                        style="color: rgb(262, 228, 0)"
                        >1
                      </span>
                      {{
                        moment(itemChild.time)
                          .locale(language)
                          .format(`${language === "ko" ? "A h:mm" : "h:mm"}`)
                      }}
                    </p>
                  </div>
                </div>
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
                  :class="isDarkMode && 'text-[#888888]'"
                  :style="`font-size: ${Math.max(
                    textSize - 5,
                    11
                  )}px;font-weight: ${fontWeight}`"
                  v-if="
                    itemChild.type === ETypeUserChat.user &&
                    itemChild.isShowTime
                  "
                >
                  <span
                    v-if="
                      showOnRead &&
                      indexChild === item.chats.length - 1 &&
                      index === dataShow.length - 1
                    "
                    class="block !leading-3 text-end"
                    :class="isDarkMode && 'text-[#888888]'"
                    :style="`font-size: ${Math.max(
                      textSize - 5,
                      11
                    )}px;font-weight: ${fontWeight}`"
                    style="color: rgb(262, 228, 0)"
                    >1</span
                  >
                  {{
                    moment(itemChild.time)
                      .locale(language)
                      .format(`${language === "ko" ? "A h:mm" : "h:mm"}`)
                  }}
                </p>
                <img
                  v-if="itemChild.type === ETypeUserChat.other"
                  :src="avatars.other"
                  alt="icon"
                  class="min-w-10 max-w-10 min-h-10 max-h-10 rounded-xl mr-2 mt-1"
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
                        ? 'right-[104%]'
                        : 'left-[104%]'
                    } -translate-y-1/2`"
                  >
                    <font-awesome-icon
                      :icon="[
                        'fas',
                        language === 'ko' ? 'comment' : 'arrow-up-from-bracket',
                      ]"
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
                  v-if="
                    itemChild.type === ETypeUserChat.other &&
                    itemChild.isShowTime
                  "
                  class="time-content self-end whitespace-nowrap ml-3 mt-10"
                  :class="isDarkMode && 'text-[#888888]'"
                  :style="`font-size: ${Math.max(textSize - 5, 11)}px`"
                >
                  <span
                    v-if="
                      showOnRead &&
                      indexChild === item.chats.length - 1 &&
                      index === dataShow.length - 1
                    "
                    class="block !leading-3 text-start"
                    :style="`font-size: ${Math.max(
                      textSize - 5,
                      11
                    )}px;font-weight: ${fontWeight}`"
                    style="color: rgb(262, 228, 0)"
                    >1
                  </span>
                  {{
                    moment(itemChild.time)
                      .locale(language)
                      .format(`${language === "ko" ? "A h:mm" : "h:mm"}`)
                  }}
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
          <chat-input-area-component :is-dark-mode="isDarkMode" />
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
          <p class="text-base">Tải xuống</p>
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
import { EUserInterface } from "../models/toolbar.model";

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
  userInterface,
  language,
  avatars,
  names,
  statusBar,
  currentDate,
  showDate,
  bgColor,
  widthPercent,
  ratioH,
  textSize,
  fontWeight,
  footer,
  fixHeight,
  scrollChat,
  showChatList,
  showOnRead,
} = storeToRefs(toolbarStore);

const isDarkMode = computed(() => {
  return (
    moment(currentDate.value).diff(
      moment(currentDate.value).set("h", 12).set("m", 0)
    ) >= 0
  );
});

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
  max-width: 82%;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  word-break: break-word;

  .content {
    @apply py-[7px] px-3 rounded-xl relative;
    background-color: rgb(262, 228, 0);
    margin-left: 8px;
    word-wrap: break-word;
    max-width: 100%;
  }

  img {
    margin-left: auto;
  }
}

.other {
  max-width: 82%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  word-break: break-word;
  .content {
    @apply py-[7px] px-3 rounded-xl relative;
    background-color: rgb(255, 255, 255);
    word-wrap: break-word;
    max-width: 100%;
    margin-right: 8px;
  }
}

// .header-container {
//   $bg-color: var(--bg-color);
//   background-color: rgba($color: $bg-color, $alpha: 0.9);
// }
</style>
