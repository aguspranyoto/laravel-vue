<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Models\Testimonial;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static string|UnitEnum|null $navigationGroup = 'Marketing';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('author')->required()->maxLength(120),
            TextInput::make('role')->maxLength(120),
            TextInput::make('company')->maxLength(120),
            Textarea::make('quote')->required()->rows(4)->columnSpanFull(),
            Select::make('rating')->options([1 => '1', 2 => '2', 3 => '3', 4 => '4', 5 => '5'])->nullable(),
            TextInput::make('sort')->numeric()->default(0),
            Select::make('status')->options(['draft' => 'Draft', 'published' => 'Published'])->required(),
            SpatieMediaLibraryFileUpload::make('avatar')->collection('avatar')->avatar()->image(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('author')->searchable()->sortable(),
            TextColumn::make('company')->toggleable(),
            TextColumn::make('status')->badge(),
            TextColumn::make('sort')->sortable(),
        ])->recordActions([EditAction::make(), DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit' => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}
