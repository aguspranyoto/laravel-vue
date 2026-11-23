<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MagicLoginLink extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $url,
        public int $expiresMinutes = 15,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Your sign-in link');
    }

    public function content(): Content
    {
        return new Content(
            htmlString: <<<HTML
                <h1>Sign in to your account</h1>
                <p>Click the button below to sign in. This link expires in {$this->expiresMinutes} minutes and can only be used once.</p>
                <p><a href="{$this->url}">Sign in</a></p>
                <p>If you did not request this, you can safely ignore this email.</p>
                HTML,
        );
    }
}
