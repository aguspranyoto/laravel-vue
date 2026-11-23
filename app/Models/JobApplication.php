<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    #[Fillable(['vacancy_id', 'name', 'email', 'cover_html', 'cv_path', 'status'])]
    protected $fillable = ['vacancy_id', 'name', 'email', 'cover_html', 'cv_path', 'status'];

    public function vacancy(): BelongsTo
    {
        return $this->belongsTo(Vacancy::class);
    }
}
