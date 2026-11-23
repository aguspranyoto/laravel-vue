<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-neutral-200 dark:border-neutral-800">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
      <div>
        <p class="text-lg font-bold">
          Acme Co
        </p>
        <p class="mt-2 text-sm text-neutral-500">
          Production-grade websites with Laravel, Filament, and Vue.
        </p>
      </div>
      <nav aria-label="Company">
        <p class="text-sm font-semibold">
          Company
        </p>
        <ul class="mt-3 space-y-2 text-sm text-neutral-500">
          <li>
            <Link href="/about" class="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/work" class="hover:underline">
              Work
            </Link>
          </li>
          <li>
            <Link href="/careers" class="hover:underline">
              Careers
            </Link>
          </li>
        </ul>
      </nav>
      <nav aria-label="Resources">
        <p class="text-sm font-semibold">
          Resources
        </p>
        <ul class="mt-3 space-y-2 text-sm text-neutral-500">
          <li>
            <Link href="/blog" class="hover:underline">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/faq" class="hover:underline">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/contact" class="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <nav aria-label="Legal">
        <p class="text-sm font-semibold">
          Account
        </p>
        <ul class="mt-3 space-y-2 text-sm text-neutral-500">
          <li>
            <Link href="/login" class="hover:underline">
              Sign in
            </Link>
          </li>
          <li>
            <Link href="/account" class="hover:underline">
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="border-t border-neutral-200 dark:border-neutral-800">
      <p class="mx-auto max-w-6xl px-4 py-4 text-xs text-neutral-500 sm:px-6">
        © {{ year }} Acme Co. All rights reserved.
      </p>
    </div>
  </footer>
</template>
