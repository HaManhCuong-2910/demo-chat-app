<template>
  <div
    :class="[
      props.data.type !== listData[props.index - 1]?.type
        ? listData[props.index - 1]?.typeHeart !== ETypeHeart.none
          ? 'mt-7 '
          : 'mt-3'
        : listData[props.index - 1]?.typeHeart !== ETypeHeart.none
        ? 'mt-7 '
        : 'mt-3',
      props.data.type === ETypeUserChat.other &&
      listData[props.index - 1]?.type !== ETypeUserChat.other
        ? 'flex items-start'
        : '',
      'relative',
    ]"
  >
    <img
      v-if="
        props.data.type === ETypeUserChat.other &&
        listData[props.index - 1]?.type !== ETypeUserChat.other
      "
      :src="dataPerson.other.avatar"
      alt="ava"
      class="w-12 h-12 rounded-full mr-2"
    />
    <div
      :class="[
        props.data.type,
        props.data.type === ETypeUserChat.other &&
        listData[props.index - 1]?.type === ETypeUserChat.other
          ? 'ml-14'
          : '',
      ]"
    >
      <div class="bg-danhthiep">
        <div class="p-2 flex items-center space-x-2">
          <label :for="`file-${props.index}`">
            <img
              :src="avatar || '/avatar.png'"
              alt="avatar"
              class="w-10 h-10 rounded-full"
            />
          </label>
          <input
            :id="`file-${props.index}`"
            type="file"
            hidden
            accept="image/*"
            @change="(event: any)=> {
        if (!event.target?.files) return;
        [...event.target.files].forEach(preview);
      }"
          />
          <p class="text-lg text-white" contenteditable="true">dsada</p>
        </div>
      </div>
      <div class="bg-white grid grid-cols-2 rounded-b-[8px] w-full">
        <div class="text-center py-[10px] border-r-custom">
          <p
            contenteditable="true"
            class="text-black font-medium"
            :style="`font-size: ${textSize - 3}px`"
          >
            Gọi điện
          </p>
        </div>
        <div class="text-center py-[10px]">
          <p
            contenteditable="true"
            class="text-[#52a2f8] font-medium"
            :style="`font-size: ${textSize - 3}px`"
          >
            Nhắn tin
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ETypeHeart,
  ETypeUserChat,
  type IDataZaloChat,
} from "../../models/chat.model";
import { useConfigZaloChatStore } from "../../stores/config-zalo-chat.store";
import { useListZaloChatStore } from "../../stores/list-zalo-chat.store";
import { useZaloChatAreaStore } from "../../stores/zalo-chat-area.store";

const props = defineProps({
  data: {
    type: Object as PropType<IDataZaloChat>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const configZaloChatStore = useConfigZaloChatStore();
const { data: listData } = storeToRefs(useListZaloChatStore());
const { textSize } = storeToRefs(configZaloChatStore);
const { dataPerson } = storeToRefs(useZaloChatAreaStore());
const avatar = ref("");

const preview = (file: File) => {
  const fr = new FileReader();
  avatar.value = "";

  fr.onload = () => {
    const img = document.createElement("img");
    img.src = fr.result as string;
    img.alt = file.name;
    avatar.value = fr.result as string;
  };
  fr.readAsDataURL(file);
};
</script>

<style scoped lang="scss">
.bg-danhthiep {
  background-image: url("/zalo/bg-business-card.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 150px;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  @apply w-[342px];
}

.user {
  @apply ml-auto max-w-[342px];
}

.other {
  @apply max-w-[342px];
}

.border-r-custom {
  position: relative;

  &::after {
    position: absolute;
    content: "";
    display: block;
    width: 1px;
    height: 50%;
    @apply bg-gray-300;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}
</style>
