import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { createPinia } from 'pinia'
import { createApp, h } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import '../css/app.css'

createInertiaApp({
  progress: { color: '#4f46e5' },
  resolve: (name) => {
    const pages = import.meta.glob<{ default: DefineComponent }>('./pages/**/*.vue', { eager: true })
    const page = pages[`./pages/${name}.vue`]
    if (!page)
      throw new Error(`Unknown page: ${name}`)
    const component = page.default as DefineComponent & { layout?: unknown }
    component.layout ??= AppLayout
    return page
  },
  setup({ el, App, props, plugin }) {
    const app = createApp({
      render: () => h(App, props),
    })
    app.use(createPinia())
    app.use(plugin)
    app.mount(el)
  },
})
