<template>
  <div ref="DateTimePickerRef">
    <client-only>
      <label
        v-if="props.label"
        :for="props.id"
        :class="[props.required && 'required', 'text-sm']"
      >
        {{ props.label }}</label
      >
      <div :class="props.label && 'mt-1'">
        <el-date-picker
          :id="props.id"
          v-model="valueDatePicker"
          :name="props.name"
          type="datetime"
          :placeholder="props.placeholder?.toLowerCase()"
          :editable="editable"
          :format="format"
          :date-format="'DD/MM/YYYY'"
          :time-format="'HH:mm'"
          :disabled-date="props.disabledDate"
          :disabled="props.disabled"
          :cell-class-name="() => 'cell-date-time-picker-container'"
          :clearable="false"
          :class="[
            'input-date-time-picker-common text-base',
            errorMessage && meta.touched ? 'is-error' : '',
            ,
            props.class,
          ]"
          :prefix-icon="customPrefix"
          popper-class="input-date-time-picker-popper"
          @change="onChange"
        >
          <template #customPrefix />
        </el-date-picker>
      </div>
      <VErrorMessage
        v-if="meta.touched"
        :name="props.name"
        :class="'error-message text-base colorBrandR700'"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  required: Boolean,
  name: {
    type: String,
    default: "",
  },
  disabledDate: Function,
  disabled: Boolean,
  value: [Date, String],
  class: String,
  placeholder: String,
  format: {
    type: String,
    default: "DD/MM/YYYY - HH:mm",
  },
  editable: {
    type: Boolean,
    default: true,
  },
  dateTime1: {
    type: Boolean,
    default: false,
  },
  isUpdateTime: {
    type: Boolean,
    default: false,
  },
});

const { errorMessage, meta, setTouched, setValue, validate } = useField(
  props.name,
  undefined,
  {
    initialValue: props.value,
    valueProp: props.value,
  }
);
const customPrefix = shallowRef({
  render() {
    return h("img", { src: "/calendar.svg" });
  },
});
const DateTimePickerRef = ref<HTMLElement>();
const valueDatePicker = ref<Date | string>("");

valueDatePicker.value = props.value || "";

const emit = defineEmits(["update:value", "onChange"]);

const onSetValueDatePicker = () => {
  valueDatePicker.value = props.value || "";
};

const onChange = async (value: string) => {
  let customValue = value ? moment(value).format("YYYY-MM-DD HH:mm") : "";
  if (props.isUpdateTime && customValue) {
    const diffTime = moment().diff(moment(customValue));

    if (diffTime > 0) {
      customValue = `${customValue.split(" ")[0]} ${moment()
        .add(10, "minutes")
        .format("HH:mm")}`;
    }
  }
  valueDatePicker.value = customValue;
  emit("update:value", customValue);
  setValue(customValue);
  await validate();
  setTouched(true);
};

watch(
  () => props.value,
  () => {
    onSetValueDatePicker();
  }
);

onMounted(() => {
  onSetValueDatePicker();
});
</script>

<style scoped lang="scss">
:deep(.input-date-time-picker-common) {
  &.el-date-editor.el-input {
    width: 100%;
    height: unset;
  }
  &.height-default {
    .el-input__wrapper {
      height: 34px !important;
    }
  }

  &.is-error {
    .el-input__wrapper {
      border: 1px solid #ef4e52 !important;
      box-shadow: 0px 0px 0px 1px #f9bdbe !important;
    }
  }

  .el-input__wrapper {
    border-radius: 12px;
    padding: 8px 16px;
    flex-direction: row-reverse;
    box-shadow: unset;
    border: 1px solid #e8e8e8;

    .el-input__inner {
      height: 20px;
      line-height: 20px;

      &::-ms-input-placeholder {
        transform: translateY(1px);
      }

      &::placeholder {
        transform: translateY(1px);
      }
    }

    &.is-focus {
      border: 1px solid #4d9578;
      box-shadow: 0px 0px 0px 1px #bdd7cc;
    }

    .el-input__prefix-inner > :last-child {
      margin-right: 0px;
    }
  }
}
.error-message {
  margin-top: 4px;
  display: block;
}

.cell {
  border-radius: 50%;
  @apply size-8 flex justify-center items-center;
  box-sizing: border-box;

  .text {
    @apply text-zinc-500 font-medium;
  }

  &.current {
    @apply bg-red-600;
    .text {
      @apply text-base font-medium text-white;
    }
  }
}
</style>
