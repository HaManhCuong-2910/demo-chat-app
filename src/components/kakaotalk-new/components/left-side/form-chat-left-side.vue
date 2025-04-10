<template>
  <div>
    <h4 class="text-base font-medium">
      {{
        props.type === ETypeUserChat.user ? "Người nhắn đi" : "Người nhắn đến"
      }}
    </h4>

    <label
      v-if="props.type === ETypeUserChat.other"
      for="other_avatar"
      class="preview-image relative block w-20 h-20 mt-4 rounded-full"
    >
      <img
        :src="avatars.other"
        alt="avatar"
        class="w-full h-full rounded-full"
      />
    </label>
    <input
      v-if="props.type === ETypeUserChat.other"
      id="other_avatar"
      class="hidden"
      type="file"
      accept="image/*"
      @change="(event) => handleChange(event)"
    />

    <div class="mt-4 relative">
      <input-common
        :placeholder="'Nhập nội dung'"
        :type="'textarea'"
        v-model:value="data.message"
      >
      </input-common>

      <div
        class="container-images flex space-x-3"
        v-if="data.images.length > 0"
      >
        <img
          v-for="item in data.images"
          :key="item"
          :src="item"
          alt="images"
          class="object-contain h-full w-fit"
        />
      </div>
    </div>

    <div class="mt-2">
      <div class="grid grid-cols-12 gap-4">
        <div
          v-for="item in dataIcons"
          @click="onSelectIcons(item)"
          :class="[isActiveIcon(item) && 'active-icon', 'p-1 w-fit']"
        >
          <img
            :key="item.type"
            :src="item.src"
            alt="icon"
            class="min-w-6 max-w-6 cursor-pointer hover:scale-125 duration-300"
          />
        </div>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <label
        :for="`files_${props.type}${
          props.quickAdd ? `_${props.quickAdd}` : ''
        }`"
        class="py-1 px-4 text-white rounded-md bg-gray-500 cursor-pointer h-8"
        >Chọn ảnh (Có thể chọn nhiều ảnh)</label
      >

      <input
        :id="`files_${props.type}${props.quickAdd ? `_${props.quickAdd}` : ''}`"
        type="file"
        accept="image/*"
        multiple
        hidden
        @change="(event: any)=> {
        if (!event.target?.files) return;
        [...event.target.files].forEach(preview);
      }"
      />

      <div class="relative">
        <button-common
          :text="'Gửi'"
          :class-text="'font-medium text-base'"
          @click="onAddMessage"
        />
        <button-common
          :text="'Cảm xúc tin nhắn'"
          :class-text="'font-medium text-base'"
          @click="isShowImagePicker = true"
        />

        <div
          v-if="isShowImagePicker"
          v-click-outside="() => (isShowImagePicker = false)"
          class="absolute bg-white p-4 rounded-lg shadow-sm"
        >
          <emoji-image-picker @update-image="onUpdateImage" />
        </div>
      </div>
      <button-common
        :text="'Ghi âm'"
        :class-text="'font-medium text-base'"
        @click="onAddCall(ETypeAddChat.record, '0:04')"
      />
      <button-common
        :text="'Cuộc gọi thoại'"
        :class-text="'font-medium text-base'"
        @click="
          onAddCall(
            ETypeAddChat.calling,
            language === 'ko' ? '음성통화' : 'Cuộc gọi thoại'
          )
        "
      />
      <button-common
        :text="'Kết thúc cuộc gọi'"
        :class-text="'font-medium text-base'"
        @click="onAddCall(ETypeAddChat.called, '00:13')"
      />
      <button-common
        :text="'Hủy cuộc gọi'"
        :class-text="'font-medium text-base'"
        @click="
          onAddCall(
            ETypeAddChat.call_canceled,
            language === 'ko' ? '취소' : 'Đã hủy'
          )
        "
      />
      <button-common
        :text="'Cuộc gọi video 1'"
        :class-text="'font-medium text-base'"
        @click="
          onAddCall(
            ETypeAddChat.video_call_green,
            language === 'ko' ? '영상통화' : 'Cuộc gọi video'
          )
        "
      />
      <button-common
        :text="'Cuộc gọi video 2'"
        :class-text="'font-medium text-base'"
        @click="onAddCall(ETypeAddChat.video_call_black, '2:13')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ETypeAddChat,
  ETypeUserChat,
} from "~/src/components/home/models/home.model";
import { useKakaotalkNewStore } from "../../stores/kakaotalk-new.store";
import { toBase64 } from "~/src/services/constant";
import { useChatKakaotalkNewStore } from "../../stores/chat-data-kakaotalk-new.store";
import moment from "moment";
import { dataIcons, ETypeQuickChat } from "../../models/kakaotalk-new.model";

const { avatars, isShowAvatar, isShowTime, language } = storeToRefs(
  useKakaotalkNewStore()
);
const { dataChats } = storeToRefs(useChatKakaotalkNewStore());

const props = defineProps({
  type: {
    type: String as PropType<ETypeUserChat>,
    default: ETypeUserChat.user,
  },
  quickAdd: String as PropType<ETypeQuickChat>,
  indexAbove: Number,
});

const emit = defineEmits(["onClose"]);

const data = ref<{
  message: string;
  images: string[];
}>({
  message: "",
  images: [],
});

const isShowImagePicker = ref(false);

const selectedIcons = ref<
  {
    type: string;
    src: string;
  }[]
>([]);

const onSelectIcons = (item: { type: string; src: string }) => {
  for (let index = 0; index < selectedIcons.value.length; index++) {
    const icon = selectedIcons.value[index];
    if (icon.type === item.type) {
      selectedIcons.value.splice(index, 1);
      return;
    }
  }

  selectedIcons.value.push(item);
};

const isActiveIcon = (item: { type: string; src: string }) => {
  return selectedIcons.value.some((itemSome) => itemSome.type === item.type);
};

const preview = (file: File) => {
  const fr = new FileReader();
  data.value.images = [];
  if (
    !!document.querySelector(
      `#files_${props.type}${props.quickAdd ? `_${props.quickAdd}` : ""}`
    )
  ) {
    // @ts-ignore
    document.querySelector(
      `#files_${props.type}${props.quickAdd ? `_${props.quickAdd}` : ""}`
      // @ts-ignore
    ).value = null;
  }

  fr.onload = () => {
    data.value.images.push(fr.result as string);
  };
  fr.readAsDataURL(file);
};

const handleChange = async (event: any) => {
  if (event.target.files[0]) {
    avatars.value.other = await toBase64(event.target.files[0]);
  }
};

const onAddMessage = () => {
  if (data.value.images.length > 0) {
    const newData = {
      images: data.value.images,
      isShowAvatar: isShowAvatar.value,
      isShowTime: isShowTime.value,
      time: moment().format("YYYY-MM-DD HH:mm"),
      type: props.type,
      typeMessage: ETypeAddChat.image,
      value: "",
      replicaIndex: null,
      icons: selectedIcons.value.map((item) => {
        return {
          ...item,
          count: 1,
        };
      }),
    };

    if (props.quickAdd === ETypeQuickChat.above) {
      dataChats.value.splice(
        props.indexAbove || dataChats.value.length - 1,
        0,
        newData
      );
    } else if (
      props.quickAdd === ETypeQuickChat.under &&
      props.indexAbove !== undefined
    ) {
      dataChats.value.splice(
        props.indexAbove + 1 || dataChats.value.length - 1,
        0,
        newData
      );
    } else {
      dataChats.value.push(newData);
    }
  } else {
    const messages = data.value.message
      .replaceAll("{#", '<img src="')
      .replaceAll(
        "#}",
        '" alt="icon" style="width: 60px;object-fit: cover;display: inline;margin-top: -7px;" />'
      );
    const newData = {
      images: [],
      isShowAvatar: isShowAvatar.value,
      isShowTime: isShowTime.value,
      time: moment().format("YYYY-MM-DD HH:mm"),
      type: props.type,
      typeMessage: ETypeAddChat.message,
      value: messages,
      replicaIndex: null,
      icons: selectedIcons.value.map((item) => {
        return {
          ...item,
          count: 1,
        };
      }),
    };

    if (props.quickAdd === ETypeQuickChat.above) {
      dataChats.value.splice(
        props.indexAbove || dataChats.value.length - 1,
        0,
        newData
      );
    } else if (
      props.quickAdd === ETypeQuickChat.under &&
      props.indexAbove !== undefined
    ) {
      dataChats.value.splice(
        props.indexAbove + 1 || dataChats.value.length - 1,
        0,
        newData
      );
    } else {
      dataChats.value.push(newData);
    }
  }

  data.value = {
    message: "",
    images: [],
  };
  selectedIcons.value = [];
  emit("onClose");
};

const onAddCall = (typeMessage: ETypeAddChat, value: string) => {
  const newData = {
    images: [],
    isShowAvatar: isShowAvatar.value,
    isShowTime: isShowTime.value,
    time: moment().format("YYYY-MM-DD HH:mm"),
    type: props.type,
    typeMessage,
    value,
    replicaIndex: null,
    icons: selectedIcons.value.map((item) => {
      return {
        ...item,
        count: 1,
      };
    }),
  };
  if (props.quickAdd === ETypeQuickChat.above) {
    dataChats.value.splice(
      props.indexAbove || dataChats.value.length - 1,
      0,
      newData
    );
  } else if (
    props.quickAdd === ETypeQuickChat.under &&
    props.indexAbove !== undefined
  ) {
    dataChats.value.splice(
      props.indexAbove + 1 || dataChats.value.length - 1,
      0,
      newData
    );
  } else {
    dataChats.value.push(newData);
  }

  data.value = {
    message: "",
    images: [],
  };
  selectedIcons.value = [];
  emit("onClose");
};

const onUpdateImage = (img: string) => {
  data.value.message += `{#${img}#}`;
};
</script>

<style scoped lang="scss">
.container-images {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}

.active-icon {
  @apply bg-black bg-opacity-20 rounded-full;
}
</style>
