<script setup lang="ts">
import type { Seo } from '@/types'
import { ref } from 'vue'
import SeoHead from '@/components/SeoHead.vue'

defineProps<{ seo?: Seo | null, groups: Record<string, { question: string, answer_html?: string | null }[]> }>()

const open = ref<string | null>(null)
</script>

<template>
  <SeoHead :seo="seo" />
  <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <h1 class="text-4xl font-bold tracking-tight">
      FAQ
    </h1>
    <div v-for="(items, group) in groups" :key="group" class="mt-8">
      <h2 class="text-lg font-semibold capitalize">
        {{ group }}
      </h2>
      <div class="mt-3 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
        <div v-for="(faq, i) in items" :key="i" class="p-5">
          <button type="button" class="flex w-full items-center justify-between gap-4 text-left font-medium" @click="open = open === `${group}-${i}` ? null : `${group}-${i}`">
            {{ faq.question }}
            <span aria-hidden="true">{{ open === `${group}-${i}` ? '−' : '+' }}</span>
          </button>
          <div v-if="open === `${group}-${i}`" class="prose-cms mt-3" v-html="faq.answer_html" />
        </div>
      </div>
    </div>
  </div>
</template>
