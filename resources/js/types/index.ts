export interface AuthUser {
  id: number
  name: string
  email: string
  is_admin?: boolean | null
}

export interface Flash {
  type?: 'success' | 'error' | 'info' | null
  message?: string | null
}

export interface Seo {
  title: string
  description: string
  canonical: string
  og_image?: string | null
  json_ld?: Record<string, unknown>
}

export interface PostCard {
  slug: string
  title: string
  excerpt?: string | null
  published_at?: string | null
  reading_minutes?: number | null
  category?: { slug: string, name: string } | null
  author?: { name: string } | null
  featured?: string | null
}

export interface ProjectCard {
  slug: string
  title: string
  client?: string | null
  summary?: string | null
  year?: number | null
  cover?: string | null
}

export interface Paginated<T> {
  data: T[]
  links: { url: string | null, label: string, active: boolean }[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
