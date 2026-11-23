<script setup lang="ts">
import type { Seo } from '@/types'
import { useForm } from '@inertiajs/vue3'
import { validate } from 'vee-validate'
import SeoHead from '@/components/SeoHead.vue'
import { contactTypedSchema } from '@/lib/schemas'

defineProps<{ seo?: Seo | null }>()

const form = useForm({
  name: '',
  email: '',
  subject: '',
  message: '',
})

async function submit() {
  const result = await validate(
    {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    },
    contactTypedSchema,
  )
  if (!result.valid) {
    const errors = result.errors as unknown as { path?: string, message?: string }[]
    const list = Array.isArray(errors)
      ? errors
      : []
    for (const key of ['name', 'email', 'message'] as const) {
      const hit = list.find(e => e?.path === key)
      form.setError(key, hit?.message ?? '')
    }
    return
  }
  form.post('/contact', {
    preserveScroll: true,
    onSuccess: () => form.reset(),
  })
}
</script>

<template>
  <SeoHead :seo="seo" />
  <div class="mx-auto max-w-2xl px-4 py-12 sm:px-6">
    <h1 class="text-4xl font-bold tracking-tight">
      Contact
    </h1>
    <p class="mt-3 text-neutral-500">
      Tell us about your project. We reply within one business day.
    </p>
    <form class="mt-8 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800" novalidate @submit.prevent="submit">
      <div class="grid gap-4">
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
          <span class="font-medium">Subject <span class="text-neutral-400">(optional)</span></span>
          <input v-model="form.subject" type="text" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">
        </label>
        <label class="grid gap-1 text-sm">
          <span class="font-medium">Message</span>
          <textarea v-model="form.message" rows="6" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700" />
          <span v-if="form.errors.message" class="text-sm text-red-600">{{ form.errors.message }}</span>
        </label>
        <button type="submit" :disabled="form.processing" class="rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-neutral-950">
          {{ form.processing ? 'Sending…' : 'Send message' }}
        </button>
      </div>
    </form>
  </div>
</template>
