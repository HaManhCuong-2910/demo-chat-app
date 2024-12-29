<template>
  <div :class="[props.data.type, props.data.type === ETypeUserChat.other]">
    <div class="relative">
      <div class="bg-danhthiep" :class="modeChat">
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
          <div>
            <p class="text-lg text-white font-[480]" contenteditable="true">
              Tên
            </p>
            <p
              class="text-base text-[#c6e1fb] font-[480]"
              contenteditable="true"
            >
              0331111111
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-b-[8px] w-full">
        <div class="text-center py-[10px]">
          <p
            contenteditable="true"
            class="text-black font-medium"
            :style="`font-size: ${textSize - 3}px`"
          >
            Gọi điện
          </p>
        </div>
      </div>
      <div
        v-if="props.data.typeHeart === ETypeHeart.inactive"
        class="w-9 h-9 absolute right-0 -bottom-5"
        :style="`background-image: url(${
          modeChat === EModeChat.dark
            ? '/zalo/heart-empty-dark.jpg'
            : '/zalo/heart-empty.png'
        });`"
        style="background-repeat: no-repeat; background-size: contain"
      ></div>

      <div
        v-if="
          props.data.typeHeart === ETypeHeart.active ||
          props.data.typeHeart === ETypeHeart.number
        "
        class="heart-number absolute right-0 -bottom-5 flex items-center"
      >
        <div
          v-if="props.data.typeHeart === ETypeHeart.number"
          class="rounded-3xl overflow-hidden h-7 flex items-center min-w-[50px] mr-2 relative"
          :class="modeChat === EModeChat.dark ? 'bg-[#292929]' : 'bg-gray-50'"
        >
          <div
            class="w-[100px] h-full absolute left-[0px]"
            :style="`background-image: url(${
              modeChat === EModeChat.dark
                ? '/zalo/heart-number-dark.png'
                : '/zalo/heart-number.png'
            });`"
            style="background-repeat: no-repeat; background-size: contain"
          ></div>
          <p
            class="font-medium relative z-10 ml-[32px] mr-[6px]"
            :style="`font-size: ${textSize - 4}px`"
            contenteditable="true"
            :class="modeChat === EModeChat.dark && 'text-white'"
          >
            1
          </p>
        </div>

        <div
          class="w-9 h-9 rounded-full"
          :style="`background-image: url(${
            modeChat === EModeChat.dark
              ? '/zalo/heart-active-dark.png'
              : '/zalo/heart-active.png'
          });`"
          style="background-repeat: no-repeat; background-size: contain"
        ></div>
      </div>

      <heart-inactive-number-component :data="props.data" />
    </div>
    <div
      class="w-full rounded-md bg-[#b6babf] py-2 text-white text-center"
      :class="props.data.typeHeart !== ETypeHeart.none ? 'mt-6' : 'mt-2'"
      contenteditable="true"
    >
      Sao chép số điện thoại
    </div>
    <p
      v-if="props.data.isDate && !props.data.dateInside"
      contenteditable="true"
      class="mt-1 w-fit !leading-[14px] p-[8px] py-[6px] text-white rounded-xl"
      :class="[modeChat === EModeChat.light && 'bg-[#b6babf]']"
      :style="`font-size: ${textSize - 6}px;font-weight: ${fontWeight};`"
    >
      {{ moment(props.data.time).format("HH:mm") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import {
  ETypeHeart,
  ETypeUserChat,
  type IDataZaloChat,
  EModeChat,
  ETypeMessage,
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
const { textSize, modeChat, fontWeight } = storeToRefs(configZaloChatStore);
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
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 150px;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  @apply w-[362px];

  &.dark {
    background-image: url("/zalo/bg-business-card-dark.jpg");
  }
  &.light {
    background-image: url("/zalo/bg-business-card.jpg");
  }
}

.user {
  @apply ml-auto max-w-[362px];
}

.other {
  @apply max-w-[362px];
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
