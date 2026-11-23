<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VacancyResource\Pages;
use App\Models\Vacancy;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class VacancyResource extends Resource
{
    protected static ?string $model = Vacancy::class;

    protected static string|UnitEnum|null $navigationGroup = 'Hiring';

    protected static ?string $label = 'Vacancy';

    protected static ?string $pluralLabel = 'Vacancies';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('title')->required()->maxLength(180),
            TextInput::make('slug')->required()->unique(ignoreRecord: true)->maxLength(180),
            TextInput::make('location')->maxLength(120),
            TextInput::make('employment_type')->maxLength(60),
            RichEditor::make('description_html')->label('Description')->columnSpanFull(),
            Select::make('status')->options(['draft' => 'Draft', 'open' => 'Open', 'closed' => 'Closed'])->required(),
            DateTimePicker::make('closes_at'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('title')->searchable()->sortable(),
            TextColumn::make('location')->toggleable(),
            TextColumn::make('status')->badge(),
            TextColumn::make('closes_at')->date()->sortable(),
        ])->recordActions([EditAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListVacancies::route('/'),
            'create' => Pages\CreateVacancy::route('/create'),
            'edit' => Pages\EditVacancy::route('/{record}/edit'),
        ];
    }
}
