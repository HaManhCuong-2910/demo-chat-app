<template>
  <ElConfigProvider :locale="viLang">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import viLang from "~/assets/locale/vi-element-plus";
</script>
