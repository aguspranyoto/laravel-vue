<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    #[Fillable(['group', 'question', 'answer_html', 'sort', 'status'])]
    protected $fillable = ['group', 'question', 'answer_html', 'sort', 'status'];

    protected function casts(): array
    {
        return ['sort' => 'integer'];
    }
}
