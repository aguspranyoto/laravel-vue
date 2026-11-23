<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    #[Fillable(['key', 'value'])]
    protected $fillable = ['key', 'value'];

    protected function casts(): array
    {
        return ['value' => 'array'];
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        try {
            $all = Cache::rememberForever('settings.all', fn () => static::pluck('value', 'key')->all());
        } catch (\Throwable) {
            return $default;
        }

        return $all[$key] ?? $default;
    }

    public static function siteName(): string
    {
        return (string) (static::get('site_name', config('app.name')));
    }

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('settings.all'));
        static::deleted(fn () => Cache::forget('settings.all'));
    }
}
