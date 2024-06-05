<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_fun',
        'cpf',
        'rg',
        'nome_fun',
        'tel',
        'fk_tipo_cartao',
        'fk_cargo',
    ];
}