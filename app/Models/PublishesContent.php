<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

trait PublishesContent
{
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->where(function (Builder $q): void {
                $q->whereNull('published_at')->orWhere('published_at', '<=', now());
            });
    }

    public function scopeOrdered(Builder $query): Builder
    {
        $sort = $this->getTable() === 'posts' ? 'published_at' : 'sort';

        return $query->orderBy($sort, $this->getTable() === 'posts' ? 'desc' : 'asc')
            ->orderBy('id', 'desc');
    }
}
