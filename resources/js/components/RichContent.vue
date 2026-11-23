<script setup lang="ts">
defineProps<{ html?: string | null }>()
</script>

<template>
  <div v-if="html" class="prose-cms" v-html="html" />
  <p v-else class="text-neutral-500">
    Content coming soon.
  </p>
</template>
