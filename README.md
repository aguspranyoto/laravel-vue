# Acme Co — Laravel 13 + Filament 5 + Vue 3 (Inertia SSR)

Production-grade company website. Public site is a Vue 3 SPA (Inertia v3) with Node SSR for SEO. Admin is Filament v5 at `/admin`. Passwordless email login via Resend. Images on Cloudflare R2. Rich text as HTML (Filament RichEditor + Tiptap v3 display chain). Media via Spatie Media Library.

## Requirements

- PHP 8.4, Composer
- Node 22+, npm
- MySQL 8 / Postgres 16 (dev: sqlite works), Redis (prod: session/cache/queue)
- Cloudflare R2 bucket + Resend API key (production)

## Setup

```bash
cp -n .env.example .env
composer install
npm install
php artisan key:generate
php artisan migrate --force
php artisan db:seed   # admin@example.com / password (admin panel)
npm run dev            # or: composer dev (server + queue + vite)
```

Admin: `http://localhost:8000/admin` — sign in with `admin@example.com` / `password`.
Frontend login: `/login` — magic link. Dev uses the `log` mail driver; the link is written to `laravel.log`.

## Environment keys that matter

| Key | Purpose |
|---|---|
| `MAIL_MAILER=resend`, `RESEND_API_KEY` | Production mail |
| `MEDIA_DISK` / `FILESYSTEM_DISK` | `public` dev, `r2` production |
| `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_ACCOUNT_ID`, `R2_URL` | Cloudflare R2 public disk + private `r2-private` for CVs |

## Useful commands

```bash
npm run typecheck   # vue-tsc --noEmit (must be clean)
npm run build       # client + SSR bundle
php artisan inertia:start-ssr   # SSR server (Supervisor in prod)
composer test       # Pest/PHPUnit suite
php artisan backup:run          # nightly backup -> R2
```

## Deploy (VPS / Forge / Docker)

1. `composer install --no-dev -o`, `npm ci && npm run build`
2. `php artisan migrate --force`
3. `php artisan config:cache route:cache view:cache`
4. Supervisor: `deploy/supervisor.conf.example` (SSR + 2 queue workers)
5. Cron: `* * * * * php artisan schedule:run`

## Production notes

- SSR always on; view-source on `/blog/{slug}` must show rendered H1/meta.
- All rich-text HTML is purified server-side (`HtmlSanitizer`, `purifier.content` profile).
- Throttles: `/contact` 5/min, applications 3/10min, `/login` 5/min.
- CVs stored private (`r2-private`), served via 30-min signed URLs in Filament.
- Magic-link tokens: sha256-hashed, 15-min TTL, single-use, pruned daily.
- Backups: `spatie/laravel-backup` nightly to R2 (see `config/backup.php`).
- Security headers: `SecureHeaders` middleware (CSP enforced outside local/admin).
