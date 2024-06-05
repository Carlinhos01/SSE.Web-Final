<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\Aluno;

class AlunoController extends Controller
{

    public function showCadAluno(Request $request){
        return view ("containerUser");

    }

    public function cadAluno(Request $request){

        $dadosvalidos = $request->validade([
            'id_alu' => 'number|required',
            'rg'=> 'string|required',
            'cpf'=> 'string|required',
            'nome_alu'=> 'string|required',
            'dt_nascimento'=> 'date|required',
            'pcd'=> 'string|required',
            'liberacao'=> 'string|required',
            'cur_ser_ens'=> 'string|required',
            'instituicao'=> 'string|required',
            'tel'=> 'string|required',
            'email'=> 'string|required',
            'senha'=> 'string|required',
            'tipo_cartao'=> 'string|required',
            'fk_tipo_cartao'=> 'string|required',
            'genero'=> 'string|required',
        ]);
        Aluno::Create($dadosValidos);
        // return view("contratoservic");
        
    }
}

