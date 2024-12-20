<template>
  <div>
    <div id="chat-area">
      <div class="header relative">
        <img src="/zalo/ico7.png" alt="zalo header" class="w-full" />
        <status-bar-chat-zalo-component />
        <name-header-chat-zalo-component />
      </div>
      <div class="content-area" :style="`height: 600px`">
        <list-chat-zalo-component />
      </div>
      <div class="footer">
        <img src="/zalo/ico4.png" alt="zalo footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#chat-area {
  background-image: url("/zalo/background.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
