<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_alu',
        'rm',
        'rg',
        'cpf',
        'nome_alu',
        'dt_nascimento',
        'pcd',
        'liberacao',
        'cur_ser_ens',
        'instituicao',
        'tel',
        'email',
        'senha',
        'tipo_cartao',
        'fk_tipo_cartao',
        'genero',
    ];
}