<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-neutral-50 px-4 dark:bg-neutral-950">
    <div class="w-full max-w-md">
      <slot />
    </div>
    <Toaster rich-colors position="top-center" />
  </div>
</template>
