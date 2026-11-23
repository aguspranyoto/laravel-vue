import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from '@vue/server-renderer'
import { createPinia } from 'pinia'
import { createSSRApp, h } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'

createServer(page =>
  createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<{ default: DefineComponent }>('./pages/**/*.vue', { eager: true })
      const resolved = pages[`./pages/${name}.vue`]
      if (!resolved)
        throw new Error(`Unknown page: ${name}`)
      const component = resolved.default as DefineComponent & { layout?: unknown }
      component.layout ??= AppLayout
      return resolved
    },
    setup({ App, props, plugin }) {
      const app = createSSRApp({
        render: () => h(App as DefineComponent, props),
      })
      app.use(createPinia())
      app.use(plugin)
      return app
    },
  }),
)
