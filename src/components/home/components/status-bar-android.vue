<template>
  <div class="status-bar-container px-4 grid grid-cols-2 py-[6px]">
    <p class="text-base" :class="props.isDarkMode && 'text-white'">
      {{ moment(currentDate).format("HH:mm") }}
    </p>
    <div class="text-end flex space-x-1 justify-end items-center">
      <svg
        v-if="isWifi"
        style="width: 16px; margin-top: -2px"
        width="42"
        height="31"
        viewBox="0 0 42 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1002_488)">
          <path
            d="M17.6401 26.3C18.4796 26.3 19.1601 25.6195 19.1601 24.78C19.1601 23.9405 18.4796 23.26 17.6401 23.26C16.8006 23.26 16.1201 23.9405 16.1201 24.78C16.1201 25.6195 16.8006 26.3 17.6401 26.3Z"
            :fill="props.isDarkMode ? 'white' : 'black'"
            :stroke="props.isDarkMode ? 'white' : 'black'"
          />
          <path
            d="M11.77 19.3C12.5093 18.4672 13.4118 17.7951 14.4216 17.3255C15.4313 16.8559 16.5268 16.5988 17.64 16.57C18.7532 16.5988 19.8487 16.8559 20.8584 17.3255C21.8682 17.7951 22.7707 18.4672 23.51 19.3M6.68 13.82C9.64182 10.9783 13.5756 9.37256 17.68 9.33C21.7836 9.37657 25.7159 10.9817 28.68 13.82M1.5 8.64C3.60455 6.43516 6.12498 4.66902 8.91579 3.44353C11.7066 2.21804 14.7125 1.55749 17.76 1.5C20.7717 1.543 23.7432 2.19815 26.4938 3.4256C29.2444 4.65304 31.7166 6.42714 33.76 8.64"
            :stroke="props.isDarkMode ? 'white' : 'black'"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M23.51 26.3L26.78 29.57L30.07 26.27M26.79 20.72V29.57M40.08 21.64L36.81 18.37L33.52 21.66M36.8 27.21V18.37"
            :stroke="props.isDarkMode ? 'white' : 'black'"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1002_488">
            <rect width="41.08" height="30.98" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <p
        v-else
        class="text-base -mt-[2.2px]"
        :class="props.isDarkMode && 'text-white'"
        contenteditable="true"
      >
        4G
      </p>

      <svg
        style="width: 12px; margin-top: -2px"
        width="27"
        height="28"
        viewBox="0 0 27 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1002_499)">
          <path
            d="M1.5 27.48V22.7M9.33 27.48V14.48M17.15 27.48V6.55M24.98 27.48V0"
            :stroke="props.isDarkMode ? 'white' : 'black'"
            stroke-width="3"
            stroke-miterlimit="10"
          />
        </g>
        <defs>
          <clipPath id="clip0_1002_499">
            <rect width="26.48" height="27.48" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <p
        class="text-base -mt-[2.2px]"
        :class="props.isDarkMode && 'text-white'"
      >
        {{ battery }}%
      </p>

      <div class="relative -mt-1">
        <svg
          width="11"
          height="15"
          viewBox="0 0 11 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1006_479)">
            <path
              d="M8.99983 1.89677H7.59983V0.687096C7.59983 0.164514 7.31983 -2.44504e-06 6.89483 -2.44504e-06H3.65482C3.55807 -0.0149515 3.45904 -0.00749943 3.36584 0.021743C3.27265 0.0509854 3.18794 0.101186 3.11866 0.168229C3.04938 0.235271 2.99751 0.317248 2.96729 0.407439C2.93707 0.497631 2.92937 0.593467 2.94482 0.687096V1.89677H1.54482C1.34067 1.89077 1.13741 1.92518 0.947483 1.99789C0.757563 2.07059 0.584983 2.18007 0.440328 2.31961C0.295672 2.45914 0.181987 2.6258 0.106239 2.80936C0.0304921 2.99291 -0.00572102 3.18951 -0.000180341 3.3871V13.1032C0.0124173 13.537 0.196095 13.9496 0.513153 14.2564C0.830213 14.5633 1.25661 14.741 1.70482 14.7532H8.84483C9.29303 14.741 9.71943 14.5633 10.0365 14.2564C10.3535 13.9496 10.5372 13.537 10.5498 13.1032V3.3871C10.5554 3.18909 10.519 2.99208 10.443 2.80819C10.3669 2.62429 10.2528 2.45741 10.1076 2.3178C9.96238 2.17819 9.78923 2.06882 9.59873 1.99641C9.40818 1.92401 9.20438 1.8901 8.99983 1.89677Z"
              :fill="props.isDarkMode ? 'white' : 'black'"
              fill-opacity="0.301961"
            />
          </g>
          <defs>
            <clipPath id="clip0_1006_479">
              <rect width="11" height="15" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <div
          class="absolute bottom-0 w-full overflow-y-hidden"
          :style="`margin-top: -4px;height: ${battery}%`"
        >
          <svg
            class="absolute bottom-0 z-10"
            width="11"
            height="15"
            viewBox="0 0 11 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1006_479)">
              <path
                d="M8.99983 1.89677H7.59983V0.687096C7.59983 0.164514 7.31983 -2.44504e-06 6.89483 -2.44504e-06H3.65482C3.55807 -0.0149515 3.45904 -0.00749943 3.36584 0.021743C3.27265 0.0509854 3.18794 0.101186 3.11866 0.168229C3.04938 0.235271 2.99751 0.317248 2.96729 0.407439C2.93707 0.497631 2.92937 0.593467 2.94482 0.687096V1.89677H1.54482C1.34067 1.89077 1.13741 1.92518 0.947483 1.99789C0.757563 2.07059 0.584983 2.18007 0.440328 2.31961C0.295672 2.45914 0.181987 2.6258 0.106239 2.80936C0.0304921 2.99291 -0.00572102 3.18951 -0.000180341 3.3871V13.1032C0.0124173 13.537 0.196095 13.9496 0.513153 14.2564C0.830213 14.5633 1.25661 14.741 1.70482 14.7532H8.84483C9.29303 14.741 9.71943 14.5633 10.0365 14.2564C10.3535 13.9496 10.5372 13.537 10.5498 13.1032V3.3871C10.5554 3.18909 10.519 2.99208 10.443 2.80819C10.3669 2.62429 10.2528 2.45741 10.1076 2.3178C9.96238 2.17819 9.78923 2.06882 9.59873 1.99641C9.40818 1.92401 9.20438 1.8901 8.99983 1.89677Z"
                :fill="`${
                  battery <= 20 ? 'red' : props.isDarkMode ? 'white' : 'black'
                }`"
              />
            </g>
            <defs>
              <clipPath id="clip0_1006_479">
                <rect width="11" height="15" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { useToolbarStore } from "../store/toolbar.store";

const { battery, currentDate, isWifi } = storeToRefs(useToolbarStore());

const props = defineProps({
  isDarkMode: Boolean,
});
</script>

<style scoped lang="scss"></style>
