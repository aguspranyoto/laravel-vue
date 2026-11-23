<?php

namespace Tests\Feature;

use App\Mail\ApplicationReceived;
use App\Mail\ContactReceived;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use App\Models\Vacancy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class SiteTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_renders_with_seo_props(): void
    {
        $response = $this->get('/');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Home')
            ->has('seo.title')
            ->has('posts')
            ->has('projects'));
    }

    public function test_blog_index_and_show_render(): void
    {
        Page::create(['slug' => 'x', 'title' => 'x', 'status' => 'published']);
        $post = Post::create([
            'slug' => 'hello-world', 'title' => 'Hello world',
            'excerpt' => 'Excerpt', 'content_html' => '<p>Body</p>',
            'status' => 'published', 'published_at' => now(),
        ]);

        $this->get('/blog')->assertOk()->assertInertia(fn ($page) => $page->component('Blog/Index'));
        $this->get('/blog/hello-world')->assertOk()
            ->assertInertia(fn ($page) => $page->component('Blog/Show')->where('post.title', 'Hello world'));
        $this->get('/blog/missing')->assertNotFound();
    }

    public function test_draft_content_is_hidden(): void
    {
        Post::create(['slug' => 'draft-post', 'title' => 'Draft', 'status' => 'draft']);

        $this->get('/blog/draft-post')->assertNotFound();
    }

    public function test_contact_submit_stores_and_queues_mail(): void
    {
        Mail::fake();

        $this->post('/contact', [
            'name' => 'Jane', 'email' => 'jane@example.com', 'message' => 'Hello, this is a test message.',
        ])->assertRedirect();

        $this->assertDatabaseHas('contact_submissions', ['email' => 'jane@example.com']);
        Mail::assertQueued(ContactReceived::class);
    }

    public function test_contact_validation(): void
    {
        $this->post('/contact', ['name' => '', 'email' => 'nope', 'message' => 'short'])
            ->assertSessionHasErrors(['name', 'email', 'message']);
    }

    public function test_contact_is_throttled(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->post('/contact', ['name' => 'A', 'email' => 'a@example.com', 'message' => 'Hello, this is a test message.']);
        }

        $this->post('/contact', ['name' => 'A', 'email' => 'a@example.com', 'message' => 'Hello, this is a test message.'])
            ->assertStatus(429);
    }

    public function test_application_upload_and_mail(): void
    {
        Mail::fake();
        $vacancy = Vacancy::create(['slug' => 'dev', 'title' => 'Dev', 'status' => 'open']);

        $this->post('/careers/dev/apply', [
            'name' => 'Jane', 'email' => 'jane@example.com', 'cover_html' => '<p>Hi</p>',
        ])->assertRedirect();

        $this->assertDatabaseHas('job_applications', ['email' => 'jane@example.com', 'vacancy_id' => $vacancy->id]);
        Mail::assertQueued(ApplicationReceived::class);
    }

    public function test_account_requires_auth(): void
    {
        $this->get('/account')->assertRedirect('/login');

        $this->actingAs(User::factory()->create())->get('/account')->assertOk();
    }

    public function test_admin_requires_admin_user(): void
    {
        $this->actingAs(User::factory()->create(['is_admin' => false]))
            ->get('/admin')->assertForbidden();

        $this->actingAs(User::factory()->create(['is_admin' => true]))
            ->get('/admin')->assertOk();
    }

    public function test_sitemap_and_robots(): void
    {
        $this->get('/sitemap.xml')->assertOk()->assertHeader('Content-Type', 'text/xml; charset=UTF-8');
        $this->get('/robots.txt')->assertOk()->assertSee('Sitemap:');
    }
}
