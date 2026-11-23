<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Testimonial extends Model implements HasMedia
{
    use InteractsWithMedia;

    #[Fillable(['author', 'role', 'company', 'quote', 'rating', 'sort', 'status'])]
    protected $fillable = ['author', 'role', 'company', 'quote', 'rating', 'sort', 'status'];

    protected function casts(): array
    {
        return ['rating' => 'integer', 'sort' => 'integer'];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(160)->height(160)->queued();
    }
}
