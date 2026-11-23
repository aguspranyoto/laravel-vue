<?php

namespace App\Support;

use Mews\Purifier\Facades\Purifier;

class HtmlSanitizer
{
    public static function clean(?string $html): string
    {
        if (! $html) {
            return '';
        }

        return Purifier::clean($html, 'content');
    }
}
