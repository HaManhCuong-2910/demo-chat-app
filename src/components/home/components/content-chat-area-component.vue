<template>
  <div class="bg-[#b6c6d6]">
    <div class="status-bar-container px-4 grid grid-cols-2 py-1">
      <p class="text-base font-medium">{{ moment().format("HH:mm") }}</p>
      <div class="text-end flex space-x-1 justify-end items-center">
        <img
          src="/reception.svg"
          alt="icon"
          class="w-[18.15px] object-contain"
        />
        <img src="/wifi.svg" alt="icon" class="w-[16px] object-contain" />
        <img src="/battery.svg" alt="icon" class="w-[26px] object-contain" />
      </div>
    </div>
    <div class="header-chat grid grid-cols-4 p-4 text-center">
      <img src="/arrow-left.svg" alt="icon" class="w-6" />
      <div class="col-span-2 text-center">
        <h3 class="text-xl font-medium">Other</h3>
      </div>
      <div class="flex justify-end space-x-4 items-center mr-4">
        <img :src="'/icon-search.svg'" alt="icon" class="w-4 object-contain" />
        <font-awesome-icon :icon="['fas', 'bars']" class="text-xl" />
      </div>
    </div>

    <div :style="'height: 600px'" class="relative">
      <div class="h-full overflow-auto px-4 py-3 pb-[78px]">
        <div v-for="(item, index) in data" :key="item.time">
          <div
            v-if="index > 0"
            class="bg-black bg-opacity-15 py-1 px-3 rounded-xl text-xs text-white flex items-center w-fit mx-auto mt-6"
          >
            <font-awesome-icon
              :icon="['far', 'calendar-days']"
              class="text-sm text-white mr-1"
            />
            {{ moment(item.time).format("dddd, MMMM D, YYYY") }}
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
              class="bg-red-300 rounded-full flex justify-center items-center w-7 h-7 mr-2 cursor-pointer"
              @click="homeStore.onDeleteData(indexChild, index)"
            >
              <font-awesome-icon :icon="['fas', 'minus']" class="w-4 h-4" />
            </div>
            <div
              v-if="itemChild.typeMessage === ETypeAddChat.message"
              :class="[itemChild.type, indexChild > 0 && 'mt-6']"
              :key="itemChild.value"
              @click="
                isShowDialog = true;
                isEditDialog = true;
                dataDialogAdd.index = indexChild;
                dataDialogAdd.indexParent = index;
              "
            >
              <p
                class="text-[11px] !leading-3 time-content"
                v-if="itemChild.type === ETypeUserChat.user"
              >
                <span
                  class="block text-[11px] !leading-3 text-end"
                  style="color: rgb(254, 240, 27)"
                  >1</span
                >
                {{ moment(itemChild.time).format("h:mm A") }}
              </p>
              <img
                v-if="itemChild.type === ETypeUserChat.other"
                src="/avatar.png"
                alt="icon"
                class="w-10 h-10 rounded-md mr-2 mt-1"
              />
              <div>
                <p
                  class="text-base mb-[2px]"
                  v-if="itemChild.type === ETypeUserChat.other"
                >
                  Other
                </p>
                <div class="w-fit content min-h-7">
                  {{ itemChild.value }}
                  <svg
                    v-if="itemChild.type === ETypeUserChat.user"
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
                    v-else
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
                class="text-xs time-content self-end"
                v-if="itemChild.type === ETypeUserChat.other"
              >
                {{ moment(itemChild.time).format("h:mm A") }}
              </p>
            </div>

            <div
              v-if="itemChild.typeMessage === ETypeAddChat.image"
              :class="[itemChild.type, indexChild > 0 && 'mt-6']"
              @click="
                isShowDialog = true;
                isEditDialog = true;
                dataDialogAdd.index = indexChild;
                dataDialogAdd.indexParent = index;
              "
            >
              <img
                v-if="itemChild.type === ETypeUserChat.other"
                src="/avatar.png"
                alt="icon"
                class="w-10 h-10 rounded-md mr-2 mt-1"
              />
              <div>
                <p
                  class="text-base mb-[2px]"
                  v-if="itemChild.type === ETypeUserChat.other"
                >
                  Other
                </p>
                <img
                  :src="itemChild.value"
                  alt="image"
                  class="max-w-[65%] rounded-xl"
                />
              </div>
            </div>
            <div class="flex flex-col ml-2 mt-2 self-end justify-self-end">
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
      <div class="absolute bottom-0 left-0 right-0">
        <chat-input-area-component />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ETypeAddChat, ETypeUserChat } from "../models/home.model";
import { useHomeStore } from "../store/home.store";
const homeStore = useHomeStore();
const { data, isShowDialog, isAddAfterDialog, isEditDialog, dataDialogAdd } =
  storeToRefs(homeStore);
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

    svg {
      @apply absolute;
      top: 2px;
      right: -2px;
    }
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

    svg {
      @apply absolute;
      top: 2px;
      left: -2px;
    }
  }
}
</style>
