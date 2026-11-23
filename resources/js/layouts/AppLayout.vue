<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import { onMounted, watch } from 'vue'
import { toast, Toaster } from 'vue-sonner'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteNav from '@/components/SiteNav.vue'
import { useShared } from '@/composables/useShared'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const { flash, user, serverTheme } = useShared()
const auth = useAuthStore()
const theme = useThemeStore()

auth.setUser(user.value)
theme.init(serverTheme.value)

function showFlash() {
  if (flash.value.message) {
    const fn = flash.value.type === 'error'
      ? toast.error
      : flash.value.type === 'info'
        ? toast.message
        : toast.success
    fn(flash.value.message)
  }
}

onMounted(() => {
  showFlash()
  router.on('finish', () => {
    auth.setUser(user.value)
    showFlash()
  })
})

watch(user, value => auth.setUser(value))
</script>

<template>
  <div class="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
    <SiteNav />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <Toaster rich-colors position="top-center" />
  </div>
</template>
