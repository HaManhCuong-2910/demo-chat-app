<template>
  <div class="flex flex-col self-end justify-self-end">
    <font-awesome-icon
      :icon="['fas', 'arrow-up']"
      class="p-1 bg-white text-xs rounded-t-full cursor-pointer text-black"
      @click="switchData('up')"
    />
    <font-awesome-icon
      :icon="['fas', 'arrow-down']"
      class="p-1 bg-white text-xs border-t border-b border-t-gray-300 border-b-gray-300 cursor-pointer text-black"
      @click="switchData('down')"
    />
    <!-- <font-awesome-icon
      :icon="['fas', 'plus']"
      class="p-1 text-xs bg-green-300 cursor-pointer text-black"
      @click="
        dataDialog.isEdit = false;
        dataDialog.isAddAfterDialog = true;
        dataDialog.index = props.index;
      "
    /> -->
    <p
      v-if="
        listData[index].typeMessage === ETypeMessage.message ||
        listData[index].typeMessage === ETypeMessage.image
      "
      class="bg-white text-black cursor-pointer"
      @click="onRepMessage"
    >
      REP
    </p>
    <font-awesome-icon
      :icon="['fas', 'minus']"
      class="p-1 text-xs rounded-b-full bg-red-300 cursor-pointer"
      @click="onDeleteData"
    />
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import {
  ETypeHeart,
  ETypeMessage,
  ETypeUserChat,
} from "../../models/chat.model";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const { data: listData, dataDialog } = storeToRefs(useListZaloChatStore());
const configZaloChatStore = useConfigZaloChatStore();
const { showChatList } = storeToRefs(configZaloChatStore);

const switchData = (value: "up" | "down") => {
  if (value === "up") {
    if (!!listData.value[props.index - 1]) {
      const temp = listData.value[props.index];
      listData.value[props.index] = listData.value[props.index - 1];
      listData.value[props.index - 1] = temp;
    }
  }

  if (value === "down") {
    if (!!listData.value[props.index + 1]) {
      const temp = listData.value[props.index];
      listData.value[props.index] = listData.value[props.index + 1];
      listData.value[props.index + 1] = temp;
    }
  }
};

const onDeleteData = () => {
  listData.value.splice(props.index, 1);
  return;
};

const onRepMessage = () => {
  const data = {
    type:
      listData.value[props.index].type === ETypeUserChat.user
        ? ETypeUserChat.other
        : ETypeUserChat.user,
    typeMessage: ETypeMessage.message,
    time: moment().format("YYYY-MM-DD HH:mm"),
    typeHeart: ETypeHeart.none,
    replicaIndex: props.index,
    value: "",
    isDate: false,
    images: [],
    isBlueText: false,
    dateInside: false,
  };

  listData.value.push(data);
  showChatList.value = listData.value.length;
};
</script>

<style scoped></style>
