<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vacancy extends Model
{
    #[Fillable(['slug', 'title', 'location', 'employment_type', 'description_html', 'status', 'closes_at'])]
    protected $fillable = ['slug', 'title', 'location', 'employment_type', 'description_html', 'status', 'closes_at'];

    protected function casts(): array
    {
        return ['closes_at' => 'datetime'];
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }
}
