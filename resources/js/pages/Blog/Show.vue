<script setup lang="ts">
import type { PostCard, Seo } from '@/types'
import { Link } from '@inertiajs/vue3'
import RichContent from '@/components/RichContent.vue'
import SeoHead from '@/components/SeoHead.vue'

defineProps<{
  seo?: Seo | null
  post: {
    title: string
    excerpt?: string | null
    content_html?: string | null
    published_at?: string | null
    reading_minutes?: number | null
    category?: { slug: string, name: string } | null
    tags?: { slug: string, name: string }[]
    author?: { name: string } | null
    featured?: string | null
  }
  related: PostCard[]
}>()
</script>

<template>
  <SeoHead :seo="seo" />
  <article class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <p v-if="post.category" class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
      {{ post.category.name }}
    </p>
    <h1 class="mt-2 text-4xl font-bold tracking-tight text-balance">
      {{ post.title }}
    </h1>
    <p v-if="post.published_at" class="mt-3 text-sm text-neutral-500">
      {{ post.published_at }}<span v-if="post.reading_minutes"> · {{ post.reading_minutes }} min read</span><span v-if="post.author"> · {{ post.author.name }}</span>
    </p>
    <img v-if="post.featured" :src="post.featured" :alt="post.title" class="mt-8 aspect-video w-full rounded-2xl object-cover">
    <RichContent :html="post.content_html" class="mt-6" />
    <div v-if="post.tags?.length" class="mt-8 flex flex-wrap gap-2">
      <span v-for="tag in post.tags" :key="tag.slug" class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-900">
        {{ tag.name }}
      </span>
    </div>
  </article>

  <section v-if="related.length" class="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
    <h2 class="text-2xl font-bold tracking-tight">
      Keep reading
    </h2>
    <div class="mt-6 grid gap-6 sm:grid-cols-3">
      <Link
        v-for="item in related"
        :key="item.slug"
        :href="`/blog/${item.slug}`"
        class="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
      >
        <p class="font-semibold">
          {{ item.title }}
        </p>
      </Link>
    </div>
  </section>
</template>
