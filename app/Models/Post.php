<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Post extends Model implements HasMedia
{
    use InteractsWithMedia, PublishesContent;

    #[Fillable(['category_id', 'author_id', 'slug', 'title', 'excerpt', 'content_html', 'seo_title', 'seo_description', 'status', 'published_at', 'reading_minutes'])]
    protected $fillable = ['category_id', 'author_id', 'slug', 'title', 'excerpt', 'content_html', 'seo_title', 'seo_description', 'status', 'published_at', 'reading_minutes'];

    protected function casts(): array
    {
        return ['published_at' => 'datetime'];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('featured')->singleFile();
        $this->addMediaCollection('og_image')->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(640)->queued();
        $this->addMediaConversion('card')->width(960)->queued();
        $this->addMediaConversion('og')->width(1200)->height(630)->queued();
    }

    protected static function booted(): void
    {
        static::saving(function (Post $post): void {
            if (empty($post->reading_minutes) && $post->content_html) {
                $post->reading_minutes = max(1, (int) ceil(str_word_count(strip_tags($post->content_html)) / 200));
            }
        });
    }
}
