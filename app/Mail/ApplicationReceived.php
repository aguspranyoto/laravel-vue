<?php

namespace App\Mail;

use App\Models\JobApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ApplicationReceived extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public JobApplication $application) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New application: '.$this->application->vacancy->title.' — '.$this->application->name,
            replyTo: [$this->application->email => $this->application->name],
        );
    }

    public function content(): Content
    {
        $a = $this->application;

        return new Content(
            htmlString: <<<HTML
                <h1>New job application</h1>
                <p><strong>Vacancy:</strong> {$a->vacancy->title}</p>
                <p><strong>Name:</strong> {$a->name}</p>
                <p><strong>Email:</strong> {$a->email}</p>
                <p><strong>Cover:</strong></p>
                <div>{$a->cover_html}</div>
                HTML,
        );
    }
}
