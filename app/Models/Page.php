<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Page extends Model implements HasMedia
{
    use InteractsWithMedia, PublishesContent;

    #[Fillable(['slug', 'title', 'excerpt', 'content_html', 'seo_title', 'seo_description', 'status', 'published_at'])]
    protected $fillable = ['slug', 'title', 'excerpt', 'content_html', 'seo_title', 'seo_description', 'status', 'published_at'];

    protected function casts(): array
    {
        return ['published_at' => 'datetime'];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('og_image')->singleFile();
        $this->addMediaCollection('hero')->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(640)->queued();
        $this->addMediaConversion('og')->width(1200)->height(630)->queued();
    }

    public function effectiveSeoTitle(): string
    {
        return $this->seo_title ?: $this->title.' | '.Setting::siteName();
    }
}
