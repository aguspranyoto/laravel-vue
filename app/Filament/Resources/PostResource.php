<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Models\Post;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use UnitEnum;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static string|UnitEnum|null $navigationGroup = 'Content';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Tabs::make('Post')->tabs([
                Tab::make('Content')->schema([
                    TextInput::make('title')->required()->maxLength(180)
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, callable $set, $get) => empty($get('slug')) ? $set('slug', Str::slug($state)) : null),
                    TextInput::make('slug')->required()->unique(ignoreRecord: true)->maxLength(180),
                    Select::make('category_id')->relationship('category', 'name')->searchable()->preload(),
                    Select::make('tags')->relationship('tags', 'name')->multiple()->searchable()->preload(),
                    TextInput::make('excerpt')->maxLength(500)->columnSpanFull(),
                    RichEditor::make('content_html')->label('Content')->columnSpanFull(),
                ]),
                Tab::make('Media')->schema([
                    SpatieMediaLibraryFileUpload::make('featured')->collection('featured')->image(),
                    SpatieMediaLibraryFileUpload::make('og_image')->collection('og_image')->label('OG image')->image(),
                ]),
                Tab::make('SEO & Publishing')->schema([
                    TextInput::make('seo_title')->maxLength(180)->columnSpanFull(),
                    TextInput::make('seo_description')->maxLength(500)->columnSpanFull(),
                    Select::make('status')->options(['draft' => 'Draft', 'published' => 'Published'])->required(),
                    DateTimePicker::make('published_at'),
                ]),
            ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('title')->searchable()->sortable()->limit(50),
            TextColumn::make('category.name')->toggleable(),
            TextColumn::make('status')->badge(),
            TextColumn::make('published_at')->dateTime()->sortable(),
        ])
            ->defaultSort('published_at', 'desc')
            ->filters([SelectFilter::make('status')->options(['draft' => 'Draft', 'published' => 'Published'])])
            ->recordActions([EditAction::make(), DeleteAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
