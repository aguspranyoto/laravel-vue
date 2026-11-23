<script setup lang="ts">
import type { Seo } from '@/types'
import { useForm } from '@inertiajs/vue3'
import { validate } from 'vee-validate'
import RichContent from '@/components/RichContent.vue'
import SeoHead from '@/components/SeoHead.vue'
import { applicationTypedSchema } from '@/lib/schemas'

const props = defineProps<{
  seo?: Seo | null
  vacancy: { slug: string, title: string, location?: string | null, employment_type?: string | null, description_html?: string | null, closes_at?: string | null }
}>()

const form = useForm<{ name: string, email: string, cover_html: string, cv: File | null }>({
  name: '',
  email: '',
  cover_html: '',
  cv: null,
})

function onFile(e: Event) {
  const input = e.target as HTMLInputElement
  form.cv = input.files?.[0] ?? null
}

async function submit() {
  const result = await validate(
    { name: form.name, email: form.email, cover_html: form.cover_html },
    applicationTypedSchema,
  )
  if (!result.valid) {
    const list = result.errors as unknown as { path?: string, message?: string }[]
    const errors = Array.isArray(list)
      ? list
      : []
    form.setError('name', errors.find(e => e?.path === 'name')?.message ?? '')
    form.setError('email', errors.find(e => e?.path === 'email')?.message ?? '')
    return
  }
  form.post(`/careers/${props.vacancy.slug}/apply`, {
    forceFormData: true,
    preserveScroll: true,
    onSuccess: () => form.reset(),
  })
}
</script>

<template>
  <SeoHead :seo="seo" />
  <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <h1 class="text-4xl font-bold tracking-tight text-balance">
      {{ vacancy.title }}
    </h1>
    <p class="mt-2 text-neutral-500">
      {{ vacancy.location }}<span v-if="vacancy.employment_type"> · {{ vacancy.employment_type }}</span>
    </p>
    <RichContent :html="vacancy.description_html" class="mt-6" />

    <form class="mt-10 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800" novalidate @submit.prevent="submit">
      <h2 class="text-xl font-bold">
        Apply
      </h2>
      <div class="mt-4 grid gap-4">
        <label class="grid gap-1 text-sm">
          <span class="font-medium">Name</span>
          <input v-model="form.name" type="text" autocomplete="name" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">
          <span v-if="form.errors.name" class="text-sm text-red-600">{{ form.errors.name }}</span>
        </label>
        <label class="grid gap-1 text-sm">
          <span class="font-medium">Email</span>
          <input v-model="form.email" type="email" autocomplete="email" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">
          <span v-if="form.errors.email" class="text-sm text-red-600">{{ form.errors.email }}</span>
        </label>
        <label class="grid gap-1 text-sm">
          <span class="font-medium">Cover note</span>
          <textarea v-model="form.cover_html" rows="5" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700" />
        </label>
        <label class="grid gap-1 text-sm">
          <span class="font-medium">CV (PDF/DOC, max 5MB)</span>
          <input type="file" accept=".pdf,.doc,.docx" @change="onFile">
        </label>
        <button type="submit" :disabled="form.processing" class="rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-neutral-950">
          {{ form.processing ? 'Sending…' : 'Submit application' }}
        </button>
      </div>
    </form>
  </div>
</template>
