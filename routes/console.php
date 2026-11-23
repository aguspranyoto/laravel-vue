<?php

use App\Models\MagicLoginToken;
use Illuminate\Support\Facades\Schedule;

Schedule::command('auth:clear-resets')->everyFifteenMinutes();
Schedule::command('model:prune', ['--model' => [MagicLoginToken::class]])->daily();
Schedule::command('backup:run')->daily()->at('02:00');
Schedule::command('backup:clean')->daily()->at('03:00');
