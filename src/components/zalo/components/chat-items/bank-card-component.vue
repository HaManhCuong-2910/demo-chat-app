<template>
  <div :class="[props.data.type, props.data.type === ETypeUserChat.other]">
    <div class="relative">
      <div class="bg-danhthiep" :class="modeChat">
        <div class="p-3 flex items-center space-x-3">
          <label :for="`file-bank-${props.index}`">
            <img
              :src="bank || '/capture.jpg'"
              alt="capture"
              class="w-10 h-10 rounded-lg"
            />
          </label>
          <input
            :id="`file-bank-${props.index}`"
            type="file"
            hidden
            accept="image/*"
            @change="(event: any)=> {
          if (!event.target?.files) return;
          [...event.target.files].forEach((file)=>preview(file,(val: string)=> {
            bank = '';
            bank = val;
          }));
        }"
          />
          <p class="text-lg text-white font-[480]" contenteditable="true">
            Tên
          </p>
        </div>

        <div class="absolute bottom-3 left-3">
          <div>
            <p class="text-2xl text-white font-medium">0336272203</p>
            <p
              class="text-base text-[#c6e1fb] font-[480]"
              contenteditable="true"
            >
              Bấm để chuyển tiền nhanh
            </p>
          </div>
        </div>

        <div class="absolute bottom-3 right-3">
          <label :for="`file-qr-bank-${props.index}`">
            <img
              :src="qrBank || '/capture.jpg'"
              alt="capture"
              class="w-20 h-20 rounded-lg"
            />
          </label>
          <input
            :id="`file-qr-bank-${props.index}`"
            type="file"
            hidden
            accept="image/*"
            @change="(event: any)=> {
          if (!event.target?.files) return;
          [...event.target.files].forEach((file)=>preview(file,(val: string)=> {
            qrBank = '';
            qrBank = val;
            console.log('qrBank',qrBank)
          }));
        }"
          />
        </div>
      </div>
      <div class="bg-white grid grid-cols-2 rounded-b-[8px] w-full">
        <div class="text-center py-3 right-line">
          <p
            contenteditable="true"
            class="text-black font-medium"
            :style="`font-size: ${textSize - 3}px`"
          >
            Lưu tài khoản
          </p>
        </div>
        <div class="text-center py-3">
          <p
            contenteditable="true"
            class="text-[#4391f6] font-medium"
            :style="`font-size: ${textSize - 3}px`"
          >
            Chuyển tiền
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
    </div>
    <p
      v-if="props.data.isDate && !props.data.dateInside"
      contenteditable="true"
      class="mt-1 w-fit !leading-[14px] p-[8px] py-[6px] text-white rounded-xl"
      :class="[
        modeChat === EModeChat.light && 'bg-[#b6babf]',
        props.data.type === ETypeUserChat.other &&
          listData[props.index - 1]?.type === ETypeUserChat.other &&
          listData[props.index - 1]?.typeMessage !== ETypeMessage.danhthiep &&
          'ml-12',
      ]"
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
const bank = ref("");
const qrBank = ref("");
const bgBank = ref("");

const preview = (file: File, callBack: Function) => {
  const fr = new FileReader();

  fr.onload = () => {
    const img = document.createElement("img");
    img.src = fr.result as string;
    img.alt = file.name;
    callBack(fr.result);
  };
  fr.readAsDataURL(file);
};
</script>

<style scoped lang="scss">
.bg-danhthiep {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 180px;
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

.right-line {
  position: relative;

  &::after {
    position: absolute;
    content: "";
    display: block;
    width: 1px;
    height: 20px;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: #b6babf;
  }
}
</style>
