import type { AuthUser, Flash, Seo } from '@/types'
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

interface SharedProps {
  auth: { user: AuthUser | null }
  flash: Flash
  theme: string
  [key: string]: unknown
}

export function useShared() {
  const page = usePage<SharedProps>()
  return {
    user: computed(() => page.props.auth?.user ?? null),
    flash: computed(() => page.props.flash ?? {}),
    serverTheme: computed(() => page.props.theme ?? 'system'),
  }
}

export function useSeoDefaults(seo?: Seo | null) {
  return computed(() => ({
    title: seo?.title ?? 'Acme Co',
    description: seo?.description ?? '',
    canonical: seo?.canonical ?? '',
    ogImage: seo?.og_image ?? null,
    jsonLd: seo?.json_ld ?? null,
  }))
}
