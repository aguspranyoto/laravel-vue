<script setup lang="ts">
import type { Seo } from '@/types'
import { Head } from '@inertiajs/vue3'
import { computed } from 'vue'

const props = defineProps<{ seo?: Seo | null }>()

const jsonLd = computed(() => (props.seo?.json_ld
  ? JSON.stringify(props.seo.json_ld)
  : null))
</script>

<template>
  <Head>
    <title>{{ seo?.title ?? 'Acme Co' }}</title>
    <meta name="description" :content="seo?.description ?? ''">
    <link v-if="seo?.canonical" rel="canonical" :href="seo.canonical">
    <meta property="og:type" content="website">
    <meta property="og:title" :content="seo?.title ?? 'Acme Co'">
    <meta property="og:description" :content="seo?.description ?? ''">
    <meta v-if="seo?.og_image" property="og:image" :content="seo.og_image">
    <meta name="twitter:card" content="summary_large_image">
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component is="script" v-if="jsonLd" type="application/ld+json">
      {{ jsonLd }}
    </component>
  </Head>
</template>
