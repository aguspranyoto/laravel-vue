<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Http\Requests\JobApplicationRequest;
use App\Mail\ApplicationReceived;
use App\Mail\ContactReceived;
use App\Models\ContactSubmission;
use App\Models\JobApplication;
use App\Models\Setting;
use App\Models\Vacancy;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class FormSubmissionController extends Controller
{
    public function contact(ContactRequest $request): RedirectResponse
    {
        $submission = ContactSubmission::create([
            ...$request->validated(),
            'meta' => [
                'ip' => $request->ip(),
                'ua' => substr((string) $request->userAgent(), 0, 500),
                'page' => url()->previous(),
            ],
        ]);

        $to = Setting::get('contact_email', config('mail.from.address'));

        Mail::to($to)->queue(new ContactReceived($submission));

        return back()->with('flash', ['type' => 'success', 'message' => 'Message sent. We reply within one business day.']);
    }

    public function apply(Vacancy $vacancy, JobApplicationRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('cvs', ['disk' => config('filesystems.default') === 'r2' ? 'r2-private' : 'local']);
        }

        $application = JobApplication::create([
            'vacancy_id' => $vacancy->id,
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'cover_html' => $data['cover_html'] ?? null,
            'cv_path' => $cvPath,
            'status' => 'new',
        ]);

        Mail::to(Setting::get('contact_email', config('mail.from.address')))->queue(new ApplicationReceived($application));

        return back()->with('flash', ['type' => 'success', 'message' => 'Application received. We will be in touch.']);
    }

    public static function cvUrl(JobApplication $application): ?string
    {
        if (! $application->cv_path) {
            return null;
        }

        $disk = config('filesystems.default') === 'r2' ? 'r2-private' : 'local';

        return Storage::disk($disk)->temporaryUrl($application->cv_path, now()->addMinutes(30));
    }
}
