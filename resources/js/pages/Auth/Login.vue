<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { validate } from 'vee-validate'
import SeoHead from '@/components/SeoHead.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { emailTypedSchema } from '@/lib/schemas'

defineOptions({ layout: AuthLayout })
defineProps<{ seo?: { title: string } | null }>()

const form = useForm({ email: '' })

async function submit() {
  const result = await validate({ email: form.email }, emailTypedSchema)
  if (!result.valid) {
    form.setError('email', result.errors[0] ?? 'Enter a valid email')
    return
  }
  form.post('/login', { preserveScroll: true })
}
</script>

<template>
  <SeoHead :seo="{ title: 'Sign in', description: 'Sign in with a magic link sent to your email.', canonical: '', ...seo }" />
  <div class="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
    <h1 class="text-2xl font-bold tracking-tight">
      Sign in
    </h1>
    <p class="mt-2 text-sm text-neutral-500">
      Enter your email and we will send you a one-time sign-in link.
    </p>
    <form class="mt-6 grid gap-4" novalidate @submit.prevent="submit">
      <label class="grid gap-1 text-sm">
        <span class="font-medium">Email</span>
        <input v-model="form.email" type="email" autocomplete="email" autofocus class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">
        <span v-if="form.errors.email" class="text-sm text-red-600">{{ form.errors.email }}</span>
      </label>
      <button type="submit" :disabled="form.processing" class="rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-neutral-950">
        {{ form.processing ? 'Sending…' : 'Send sign-in link' }}
      </button>
    </form>
  </div>
</template>
