<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PortfolioProjectResource\Pages;
use App\Models\PortfolioProject;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class PortfolioProjectResource extends Resource
{
    protected static ?string $model = PortfolioProject::class;

    protected static string|UnitEnum|null $navigationGroup = 'Marketing';

    protected static ?string $label = 'Project';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Tabs::make('Project')->tabs([
                Tab::make('Content')->schema([
                    TextInput::make('title')->required()->maxLength(180),
                    TextInput::make('slug')->required()->unique(ignoreRecord: true)->maxLength(180),
                    TextInput::make('client')->maxLength(180),
                    TextInput::make('project_url')->url()->maxLength(255)->columnSpanFull(),
                    TextInput::make('summary')->maxLength(500)->columnSpanFull(),
                    RichEditor::make('content_html')->label('Content')->columnSpanFull(),
                    TagsInput::make('tags'),
                    TextInput::make('year')->numeric()->minValue(1990)->maxValue(2100),
                    TextInput::make('sort')->numeric()->default(0),
                ]),
                Tab::make('Media')->schema([
                    SpatieMediaLibraryFileUpload::make('cover')->collection('cover')->image(),
                    SpatieMediaLibraryFileUpload::make('gallery')->collection('gallery')->multiple()->image()->reorderable(),
                ]),
                Tab::make('Publishing')->schema([
                    Select::make('status')->options(['draft' => 'Draft', 'published' => 'Published'])->required(),
                    DateTimePicker::make('published_at'),
                ]),
            ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('title')->searchable()->sortable(),
            TextColumn::make('client')->toggleable(),
            TextColumn::make('status')->badge(),
            TextColumn::make('sort')->sortable(),
        ])->recordActions([EditAction::make(), DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPortfolioProjects::route('/'),
            'create' => Pages\CreatePortfolioProject::route('/create'),
            'edit' => Pages\EditPortfolioProject::route('/{record}/edit'),
        ];
    }
}
