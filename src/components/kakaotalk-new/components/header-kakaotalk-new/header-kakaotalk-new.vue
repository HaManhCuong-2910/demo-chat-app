<template>
  <div class="header-chat grid grid-cols-12 px-10 p-8 text-center items-center">
    <div>
      <svg
        width="25"
        height="46"
        viewBox="0 0 25 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_5_12)">
          <path
            d="M4.27721 23L24.4942 2.92794C25.1819 2.24513 25.1665 1.15301 24.4596 0.488648C23.7527 -0.175715 22.6221 -0.160755 21.9344 0.522064L0.505846 21.7971C-0.168615 22.4668 -0.168615 23.5332 0.505846 24.2029L21.9344 45.4779C22.6221 46.1608 23.7527 46.1758 24.4596 45.5114C25.1665 44.8469 25.1819 43.7548 24.4942 43.0721L4.27721 23Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_5_12">
            <rect width="25" height="46" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="text-center col-span-10">
      <p class="text-[48px] font-medium">Người khác</p>
    </div>
    <div class="flex justify-end space-x-8 items-center mr-2">
      <font-awesome-icon
        :icon="['fas', 'magnifying-glass']"
        class="text-[44px]"
      />
      <font-awesome-icon :icon="['fas', 'bars']" class="text-[48px]" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
