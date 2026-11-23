<?php

namespace App\Http\Controllers;

use App\Mail\MagicLoginLink;
use App\Models\MagicLoginToken;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MagicLoginController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function checkEmail(Request $request): Response
    {
        return Inertia::render('Auth/CheckEmail', [
            'email' => $request->session()->get('magic_login_email'),
        ]);
    }

    public function resend(Request $request): RedirectResponse
    {
        $email = strtolower((string) ($request->input('email') ?: $request->session()->get('magic_login_email', '')));

        if (! $email || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return redirect()->route('login')->with('flash', [
                'type' => 'error',
                'message' => 'Enter your email first.',
            ]);
        }

        $request->merge(['email' => $email]);

        return $this->store($request);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate(['email' => ['required', 'email:rfc', 'max:255']]);
        $email = strtolower($data['email']);

        $key = 'magic-link:'.$request->ip().':'.$email;
        if (RateLimiter::tooManyAttempts($key, 5)) {
            return back()->withErrors(['email' => 'Too many attempts. Please try again in a minute.']);
        }
        RateLimiter::hit($key, 60);

        $user = User::firstOrCreate(['email' => $email], [
            'name' => Str::before($email, '@'),
            'password' => Hash::make(Str::random(40)),
        ]);

        MagicLoginToken::where('email', $email)->whereNull('consumed_at')->delete();

        $raw = Str::random(64);
        $token = MagicLoginToken::create([
            'email' => $email,
            'user_id' => $user->id,
            'token_hash' => hash('sha256', $raw),
            'expires_at' => now()->addMinutes(15),
        ]);

        $url = route('auth.magic.consume', ['token' => $raw]);

        $request->session()->put('magic_login_email', $email);

        if (config('mail.default') === 'resend' && config('services.resend.key')) {
            Mail::to($email)->queue(new MagicLoginLink($url));
        } else {
            Mail::to($email)->send(new MagicLoginLink($url));
            logger()->info('Magic login link (dev)', ['email' => $email, 'url' => $url, 'token_id' => $token->id]);
        }

        return redirect()->route('login.check-email')->with('flash', [
            'type' => 'success',
            'message' => 'Check your inbox for the sign-in link.',
        ]);
    }

    public function consume(string $token, Request $request): RedirectResponse
    {
        $record = MagicLoginToken::where('token_hash', hash('sha256', $token))->first();

        if (! $record || ! $record->isValid()) {
            return redirect()->route('login')->with('flash', [
                'type' => 'error',
                'message' => 'This sign-in link is invalid or has expired.',
            ]);
        }

        $record->update(['consumed_at' => now()]);
        $user = $record->user ?? User::where('email', $record->email)->firstOrFail();

        if (! $user->email_verified_at) {
            $user->forceFill(['email_verified_at' => now()])->save();
        }

        $request->session()->regenerate();
        auth()->login($user, remember: true);

        return redirect()->intended(route('account'))->with('flash', [
            'type' => 'success',
            'message' => 'Signed in successfully.',
        ]);
    }

    public function destroy(Request $request): RedirectResponse
    {
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home')->with('flash', [
            'type' => 'success',
            'message' => 'Signed out.',
        ]);
    }
}
