<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Symfony\Component\HttpFoundation\Response;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()?->only(['id', 'name', 'email', 'is_admin']),
            ],
            'flash' => [
                'type' => $request->session()->get('flash.type'),
                'message' => $request->session()->get('flash.message'),
            ],
            'theme' => $request->cookie('theme', 'system'),
        ];
    }

    public function response($request, $response): Response
    {
        if ($request->hasSession() && ($flash = $request->session()->get('flash'))) {
            $request->session()->forget('flash');
            $response->headers->set('X-Flash', json_encode($flash));
        }

        return parent::response($request, $response);
    }
}
