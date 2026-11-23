<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Page;
use App\Models\PortfolioProject;
use App\Models\Post;
use App\Models\Setting;
use App\Models\Testimonial;
use App\Models\Vacancy;
use App\Support\HtmlSanitizer;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class SiteController extends Controller
{
    public function home(): Response
    {
        $posts = Post::published()->ordered()->limit(3)->with(['category', 'author'])->get()
            ->map(fn (Post $p) => self::postCard($p));
        $projects = PortfolioProject::published()->ordered()->limit(6)->get()
            ->map(fn (PortfolioProject $p) => self::projectCard($p));
        $testimonials = Testimonial::where('status', 'published')->orderBy('sort')->limit(6)->get();

        return Inertia::render('Home', [
            'posts' => $posts,
            'projects' => $projects,
            'testimonials' => $testimonials,
            'seo' => Seo::forPage('home', null, ['default_title' => Setting::siteName()]),
        ]);
    }

    public function about(): Response
    {
        return $this->page('about', 'About');
    }

    public function services(): Response
    {
        return $this->page('services', 'Services');
    }

    private function page(string $slug, string $fallbackTitle): Response
    {
        $page = Page::where('slug', $slug)->published()->firstOrFail();

        return Inertia::render('Page', [
            'page' => [
                'title' => $page->title,
                'excerpt' => $page->excerpt,
                'content_html' => HtmlSanitizer::clean($page->content_html),
                'hero' => $page->getFirstMediaUrl('hero'),
            ],
            'seo' => Seo::forPage($slug, $page),
        ]);
    }

    public function work(): Response
    {
        $projects = PortfolioProject::published()->ordered()->paginate(12)->through(fn (PortfolioProject $p) => self::projectCard($p));

        return Inertia::render('Work/Index', [
            'projects' => $projects,
            'seo' => Seo::forPage('work', null, ['default_title' => 'Work']),
        ]);
    }

    public function workShow(string $slug): Response
    {
        $project = PortfolioProject::where('slug', $slug)->published()->firstOrFail();

        return Inertia::render('Work/Show', [
            'project' => [
                'title' => $project->title,
                'client' => $project->client,
                'summary' => $project->summary,
                'content_html' => HtmlSanitizer::clean($project->content_html),
                'project_url' => $project->project_url,
                'year' => $project->year,
                'tags' => $project->tags,
                'cover' => $project->getFirstMediaUrl('cover'),
                'gallery' => $project->getMedia('gallery')->map(fn ($m) => $m->getUrl())->values(),
            ],
            'seo' => Seo::forPage('work.show', $project),
        ]);
    }

    public function blog(): Response
    {
        $posts = Post::published()->ordered()->with(['category', 'tags'])->paginate(9)
            ->through(fn (Post $p) => self::postCard($p));

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'seo' => Seo::forPage('blog', null, ['default_title' => 'Blog']),
        ]);
    }

    public function blogShow(string $slug): Response
    {
        $post = Post::where('slug', $slug)->published()->with(['category', 'tags', 'author'])->firstOrFail();
        $related = Post::published()->where('id', '!=', $post->id)->ordered()->limit(3)->get()
            ->map(fn (Post $p) => self::postCard($p));

        return Inertia::render('Blog/Show', [
            'post' => [
                'title' => $post->title,
                'excerpt' => $post->excerpt,
                'content_html' => HtmlSanitizer::clean($post->content_html),
                'published_at' => $post->published_at?->toDateString(),
                'reading_minutes' => $post->reading_minutes,
                'category' => $post->category?->only(['slug', 'name']),
                'tags' => $post->tags->map->only(['slug', 'name'])->values(),
                'author' => $post->author?->only(['name']),
                'featured' => $post->getFirstMediaUrl('featured') ?: $post->getFirstMediaUrl('cover'),
            ],
            'related' => $related,
            'seo' => Seo::article($post, route('blog.show', $post->slug)),
        ]);
    }

    public function careers(): Response
    {
        $vacancies = Vacancy::where('status', 'open')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Careers/Index', [
            'vacancies' => $vacancies,
            'seo' => Seo::forPage('careers', null, ['default_title' => 'Careers']),
        ]);
    }

    public function careerShow(string $slug): Response
    {
        $vacancy = Vacancy::where('slug', $slug)->where('status', 'open')->firstOrFail();

        return Inertia::render('Careers/Show', [
            'vacancy' => [
                ...$vacancy->only(['slug', 'title', 'location', 'employment_type']),
                'description_html' => HtmlSanitizer::clean($vacancy->description_html),
                'closes_at' => $vacancy->closes_at?->toDateString(),
            ],
            'seo' => Seo::forPage('careers.show', null, ['default_title' => $vacancy->title]),
        ]);
    }

    public function faq(): Response
    {
        $faqs = Faq::where('status', 'published')->orderBy('sort')->get()->groupBy('group');

        return Inertia::render('Faq', [
            'groups' => $faqs,
            'seo' => Seo::forPage('faq', null, ['default_title' => 'FAQ']),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Contact', [
            'seo' => Seo::forPage('contact', null, ['default_title' => 'Contact']),
        ]);
    }

    public function account(): Response
    {
        return Inertia::render('Account', [
            'seo' => Seo::forPage('account', null, ['default_title' => 'Account']),
        ]);
    }

    public static function postCard(Post $post): array
    {
        return [
            'slug' => $post->slug,
            'title' => $post->title,
            'excerpt' => $post->excerpt,
            'published_at' => $post->published_at?->toDateString(),
            'reading_minutes' => $post->reading_minutes,
            'category' => $post->category?->only(['slug', 'name']),
            'author' => $post->author?->only(['name']),
            'featured' => $post->getFirstMediaUrl('featured') ?: null,
        ];
    }

    public static function projectCard(PortfolioProject $project): array
    {
        return [
            'slug' => $project->slug,
            'title' => $project->title,
            'client' => $project->client,
            'summary' => $project->summary,
            'year' => $project->year,
            'cover' => $project->getFirstMediaUrl('cover'),
        ];
    }
}
