<?php

namespace App\Support;

use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;

class Seo
{
    /**
     * @return array{title:string,description:string,canonical:string,og_image:?string,json_ld:array}
     */
    public static function forPage(string $routeName, ?Model $model = null, array $overrides = []): array
    {
        $site = Setting::siteName();
        $title = $overrides['title'] ?? $model?->seo_title ?? $model?->title ?? null;
        $title = $title ? $title.(str_ends_with($title, $site) ? '' : ' | '.$site) : ($overrides['default_title'] ?? $site);
        $description = $overrides['description'] ?? $model?->seo_description ?? $model?->excerpt ?? Setting::get('seo_description', '');
        $canonical = url()->current();

        $ogImage = $overrides['og_image'] ?? null;
        if (! $ogImage && $model && method_exists($model, 'getFirstMediaUrl')) {
            $ogImage = $model->getFirstMediaUrl('og_image') ?: $model->getFirstMediaUrl('featured') ?: $model->getFirstMediaUrl('cover');
        }
        $ogImage = $ogImage ?: Setting::get('seo_og_image');

        $jsonLd = [
            '@context' => 'https://schema.org',
            '@type' => 'WebPage',
            'name' => $title,
            'description' => $description,
            'url' => $canonical,
        ];
        if (! empty($overrides['json_ld'])) {
            $jsonLd = array_merge($jsonLd, $overrides['json_ld']);
        }

        return compact('title', 'description', 'canonical', 'ogImage', 'jsonLd') + ['og_image' => $ogImage];
    }

    /**
     * @return array{title:string,description:string,canonical:string,og_image:?string,json_ld:array}
     */
    public static function article(object $post, string $canonical): array
    {
        $seo = static::forPage('blog.show', $post, ['json_ld' => [
            '@type' => 'BlogPosting',
            'headline' => $post->title,
            'datePublished' => $post->published_at?->toIso8601String(),
            'dateModified' => $post->updated_at?->toIso8601String(),
            'author' => ['@type' => 'Person', 'name' => $post->author?->name ?? Setting::siteName()],
        ]]);
        $seo['canonical'] = $canonical;

        return $seo;
    }
}
