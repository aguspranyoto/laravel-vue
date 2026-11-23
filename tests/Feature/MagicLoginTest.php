<?php

namespace Tests\Feature;

use App\Mail\MagicLoginLink;
use App\Models\MagicLoginToken;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class MagicLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_page_renders(): void
    {
        $this->get('/login')->assertOk();
    }

    public function test_request_link_creates_token_and_sends_mail(): void
    {
        Mail::fake();

        $this->post('/login', ['email' => 'user@example.com'])->assertRedirect('/login/check-email');

        $this->assertDatabaseCount('magic_login_tokens', 1);
        $this->assertDatabaseHas('users', ['email' => 'user@example.com']);
        Mail::assertQueued(MagicLoginLink::class);
    }

    public function test_request_link_is_throttled(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->post('/login', ['email' => "user{$i}@example.com"])->assertRedirect();
        }

        $this->post('/login', ['email' => 'extra@example.com'])->assertStatus(429);
    }

    public function test_consume_valid_link_logs_user_in(): void
    {
        Mail::fake();
        $this->post('/login', ['email' => 'user@example.com']);

        $record = MagicLoginToken::first();
        $raw = $this->rawTokenFor($record);

        $this->get(route('auth.magic.consume', ['token' => $raw]))->assertRedirect('/account');
        $this->assertAuthenticated();
        $this->assertNotNull($record->fresh()->consumed_at);
    }

    public function test_link_is_single_use(): void
    {
        Mail::fake();
        $this->post('/login', ['email' => 'user@example.com']);
        $record = MagicLoginToken::first();
        $raw = $this->rawTokenFor($record);

        $this->get(route('auth.magic.consume', ['token' => $raw]));
        auth()->logout();

        $this->get(route('auth.magic.consume', ['token' => $raw]))->assertRedirect('/login');
        $this->assertGuest();
    }

    public function test_expired_link_rejected(): void
    {
        $user = User::factory()->create();
        $record = MagicLoginToken::create([
            'email' => $user->email,
            'user_id' => $user->id,
            'token_hash' => hash('sha256', 'raw-token'),
            'expires_at' => now()->subMinute(),
        ]);

        $this->get(route('auth.magic.consume', ['token' => 'raw-token']))->assertRedirect('/login');
        $this->assertGuest();
        $this->assertNull($record->fresh()->consumed_at);
    }

    public function test_logout(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->post('/logout')->assertRedirect('/');
        $this->assertGuest();
    }

    private function rawTokenFor(MagicLoginToken $record): string
    {
        // Tokens are stored hashed; recreate a known one for the test.
        $raw = 'test-raw-token-'.uniqid();
        $record->update(['token_hash' => hash('sha256', $raw)]);

        return $raw;
    }
}
