<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use UnitEnum;

class ManageSettings extends Page
{
    protected static ?string $navigationLabel = 'Settings';

    protected static string|UnitEnum|null $navigationGroup = 'System';

    protected string $view = 'filament.pages.manage-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'site_name' => Setting::get('site_name', config('app.name')),
            'contact_email' => Setting::get('contact_email', config('mail.from.address')),
            'seo_description' => Setting::get('seo_description', ''),
            'brand_primary' => Setting::get('brand_primary', '#4f46e5'),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema->statePath('data')->schema([
            Section::make('Site')->schema([
                TextInput::make('site_name')->required()->maxLength(120),
                TextInput::make('contact_email')->email()->required()->maxLength(255),
                Textarea::make('seo_description')->rows(3)->columnSpanFull(),
                ColorPicker::make('brand_primary')->label('Brand color'),
            ]),
        ]);
    }

    public function save(): void
    {
        foreach ($this->form->getState() as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        Notification::make()->title('Settings saved')->success()->send();
    }
}
