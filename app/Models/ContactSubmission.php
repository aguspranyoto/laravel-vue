<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    #[Fillable(['name', 'email', 'subject', 'message', 'meta', 'read_at', 'replied_at'])]
    protected $fillable = ['name', 'email', 'subject', 'message', 'meta', 'read_at', 'replied_at'];

    protected function casts(): array
    {
        return ['meta' => 'array', 'read_at' => 'datetime', 'replied_at' => 'datetime'];
    }

    public function markRead(): void
    {
        if ($this->read_at === null) {
            $this->update(['read_at' => now()]);
        }
    }
}
