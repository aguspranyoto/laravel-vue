<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import SeoHead from '@/components/SeoHead.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

defineOptions({ layout: AuthLayout })

const props = defineProps<{ email?: string | null }>()

const form = useForm({ email: props.email ?? '' })
const cooldown = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function resend() {
  if (cooldown.value > 0 || !form.email)
    return
  form.post('/login/resend', {
    preserveScroll: true,
    onSuccess: () => {
      cooldown.value = 30
      timer = setInterval(() => {
        cooldown.value -= 1
        if (cooldown.value <= 0 && timer) {
          clearInterval(timer)
          timer = null
        }
      }, 1000)
    },
  })
}
</script>

<template>
  <SeoHead :seo="{ title: 'Check your email', description: 'We sent you a sign-in link.', canonical: '' }" />
  <div class="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
    <p class="text-4xl" aria-hidden="true">
      ✉️
    </p>
    <h1 class="mt-4 text-2xl font-bold tracking-tight">
      Check your email
    </h1>
    <p class="mt-2 text-sm text-neutral-500">
      We sent you a one-time sign-in link. It expires in 15 minutes.
    </p>
    <div class="mt-6 flex flex-col items-center gap-3">
      <button
        type="button"
        :disabled="form.processing || cooldown > 0"
        class="rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-neutral-950"
        @click="resend"
      >
        {{ cooldown > 0 ? `Resend link (${cooldown}s)` : 'Resend link' }}
      </button>
      <Link href="/login" class="text-sm font-semibold underline underline-offset-4">
        Use a different email
      </Link>
    </div>
  </div>
</template>
