<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class PortfolioProject extends Model implements HasMedia
{
    use InteractsWithMedia, PublishesContent;

    #[Fillable(['slug', 'title', 'client', 'summary', 'content_html', 'project_url', 'year', 'tags', 'sort', 'status', 'published_at'])]
    protected $fillable = ['slug', 'title', 'client', 'summary', 'content_html', 'project_url', 'year', 'tags', 'sort', 'status', 'published_at'];

    protected function casts(): array
    {
        return ['published_at' => 'datetime', 'tags' => 'array', 'year' => 'integer', 'sort' => 'integer'];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover')->singleFile();
        $this->addMediaCollection('gallery');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(640)->queued();
        $this->addMediaConversion('card')->width(960)->queued();
    }
}
