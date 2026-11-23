<?php

namespace App\Mail;

use App\Models\ContactSubmission;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactReceived extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public ContactSubmission $submission) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New contact submission: '.($this->submission->subject ?: 'General enquiry'),
            replyTo: [$this->submission->email => $this->submission->name],
        );
    }

    public function content(): Content
    {
        $s = $this->submission;

        return new Content(
            htmlString: <<<HTML
                <h1>New contact submission</h1>
                <p><strong>Name:</strong> {$s->name}</p>
                <p><strong>Email:</strong> {$s->email}</p>
                <p><strong>Subject:</strong> {$s->subject}</p>
                <p><strong>Message:</strong></p>
                <p>{$s->message}</p>
                HTML,
        );
    }
}
