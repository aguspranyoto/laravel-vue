<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Faq;
use App\Models\Page;
use App\Models\PortfolioProject;
use App\Models\Post;
use App\Models\Setting;
use App\Models\Tag;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\Vacancy;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(['email' => 'admin@example.com'], [
            'name' => 'Admin',
            'password' => 'password',
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        Setting::updateOrCreate(['key' => 'site_name'], ['value' => 'Acme Co']);
        Setting::updateOrCreate(['key' => 'contact_email'], ['value' => 'hello@example.com']);
        Setting::updateOrCreate(['key' => 'seo_description'], ['value' => 'Acme Co builds production-grade websites with Laravel, Filament, and Vue.']);
        Setting::updateOrCreate(['key' => 'brand_primary'], ['value' => '#4f46e5']);

        $pages = [
            'home' => 'Home',
            'about' => 'About us',
            'services' => 'Services',
            'contact' => 'Contact',
        ];
        foreach ($pages as $slug => $title) {
            Page::firstOrCreate(['slug' => $slug], [
                'title' => $title,
                'excerpt' => $title.' page of '.Setting::siteName().'.',
                'content_html' => "<p>Welcome to the {$title} page. Edit this copy in the admin panel.</p>",
                'status' => 'published',
                'published_at' => now(),
            ]);
        }

        $cat = Category::firstOrCreate(['slug' => 'news'], ['name' => 'News']);
        $tag = Tag::firstOrCreate(['slug' => 'laravel'], ['name' => 'Laravel']);

        $post = Post::firstOrCreate(['slug' => 'hello-world'], [
            'category_id' => $cat->id,
            'title' => 'Hello world',
            'excerpt' => 'Our first post.',
            'content_html' => '<p>This is the first post. Replace with real content.</p>',
            'status' => 'published',
            'published_at' => now(),
        ]);
        $post->tags()->syncWithoutDetaching([$tag->id]);

        PortfolioProject::firstOrCreate(['slug' => 'sample-project'], [
            'title' => 'Sample project',
            'client' => 'Sample client',
            'summary' => 'A sample case study.',
            'content_html' => '<p>Project story goes here.</p>',
            'status' => 'published',
            'published_at' => now(),
        ]);

        Testimonial::firstOrCreate(['author' => 'Jane Doe'], [
            'role' => 'CEO',
            'company' => 'Example Inc',
            'quote' => 'They shipped a fast, beautiful site on time.',
            'rating' => 5,
            'status' => 'published',
        ]);

        Faq::firstOrCreate(['question' => 'How do I contact you?'], [
            'group' => 'general',
            'answer_html' => '<p>Use the contact form and we reply within one business day.</p>',
            'status' => 'published',
        ]);

        Vacancy::firstOrCreate(['slug' => 'frontend-engineer'], [
            'title' => 'Frontend Engineer',
            'location' => 'Remote',
            'employment_type' => 'Full-time',
            'description_html' => '<p>We are hiring a Vue engineer.</p>',
            'status' => 'open',
        ]);
    }
}
