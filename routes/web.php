<?php

use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\MagicLoginController;
use App\Http\Controllers\SiteController;
use App\Models\PortfolioProject;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

Route::get('/', [SiteController::class, 'home'])->name('home');
Route::get('/about', [SiteController::class, 'about'])->name('about');
Route::get('/services', [SiteController::class, 'services'])->name('services');
Route::get('/work', [SiteController::class, 'work'])->name('work');
Route::get('/work/{slug}', [SiteController::class, 'workShow'])->name('work.show');
Route::get('/blog', [SiteController::class, 'blog'])->name('blog');
Route::get('/blog/{slug}', [SiteController::class, 'blogShow'])->name('blog.show');
Route::get('/careers', [SiteController::class, 'careers'])->name('careers');
Route::get('/careers/{slug}', [SiteController::class, 'careerShow'])->name('careers.show');
Route::get('/faq', [SiteController::class, 'faq'])->name('faq');
Route::get('/contact', [SiteController::class, 'contact'])->name('contact');

Route::post('/contact', [FormSubmissionController::class, 'contact'])
    ->middleware('throttle:5,1')->name('contact.store');
Route::post('/careers/{vacancy:slug}/apply', [FormSubmissionController::class, 'apply'])
    ->middleware('throttle:3,10')->name('careers.apply');

Route::middleware('guest')->group(function () {
    Route::get('/login', [MagicLoginController::class, 'show'])->name('login');
    Route::post('/login', [MagicLoginController::class, 'store'])
        ->middleware('throttle:5,1')->name('login.store');
    Route::post('/login/resend', [MagicLoginController::class, 'resend'])
        ->middleware('throttle:3,1')->name('login.resend');
    Route::get('/login/check-email', [MagicLoginController::class, 'checkEmail'])->name('login.check-email');
    Route::get('/auth/magic/{token}', [MagicLoginController::class, 'consume'])
        ->middleware('throttle:10,1')->name('auth.magic.consume');
});

Route::middleware('auth')->group(function () {
    Route::get('/account', [SiteController::class, 'account'])->name('account');
    Route::post('/logout', [MagicLoginController::class, 'destroy'])->name('logout');
});

Route::get('/sitemap.xml', function () {
    $sitemap = Sitemap::create()
        ->add(Url::create(route('home')))
        ->add(Url::create(route('about')))
        ->add(Url::create(route('services')))
        ->add(Url::create(route('work')))
        ->add(Url::create(route('blog')))
        ->add(Url::create(route('careers')))
        ->add(Url::create(route('faq')))
        ->add(Url::create(route('contact')));

    PortfolioProject::published()->get()->each(fn ($p) => $sitemap->add(
        Url::create(route('work.show', $p->slug))->setLastModificationDate($p->updated_at)
    ));
    Post::published()->get()->each(fn ($p) => $sitemap->add(
        Url::create(route('blog.show', $p->slug))->setLastModificationDate($p->updated_at)
    ));

    return $sitemap->toResponse(request());
})->name('sitemap');

Route::get('/robots.txt', fn () => response(
    "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /account\n\nSitemap: ".route('sitemap')."\n",
    200, ['Content-Type' => 'text/plain']
))->name('robots');
