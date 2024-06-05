
@section('content')
<div id="addmodal" class="addmodal">
    <div class="addmodal-content">
        <span class="addmodal-close">&times;</span>
        <h2>Adicionar Usuário</h2>
        <div class="cont-card-user-add">
            
            <form id="add-user-form" action="#" method="post">
            <label for="" id="labelforaluhj">Aluno:</label>

                <!-- Nome -->
                <input type="text" name="nome_alu" id="add-user-name" placeholder="Nome do usuário" required>
                <!-- Email -->
                <input type="email" name="email" id="add-user-email" placeholder="E-mail do usuário" required>
                <!-- Telefone -->
                <input type="tel" name="telefone" id="telefone" placeholder="Telefone do usuário" maxlength="11" required>
                <!-- Data de Nascimento -->
                <input type="text" id="add-user-dt_nasc" placeholder="Data de Aniversário" maxlength="11" required>
                <!-- Gênero -->
                <select name="genero" id="add-user-genero" required>
                    <option value="" disabled selected>Selecione o Gênero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                    <option value="Não quero declarar">Não quero declarar</option>
                </select>
                <!-- Curso/Série/Ensino -->
                <input type="text" name="curserens" id="cur-ser-ens" placeholder="Curso/Série/Ensino" required>
                <!-- Instituição -->
                <input type="text" name="instituicao" id="instituicao" placeholder="Instituição" required>
                <!-- CPF -->
                <input type="text" name="cpf" id="add-user-cpf" placeholder="CPF" maxlength="11" required>
                <!-- RG -->
                <input type="text" name="rg" id="add-user-rg" placeholder="RG"  maxlength="10"  required>
                <!-- PCD -->
                <select name="pcd" id="add-user-pcd" required>
                    <option value="" disabled selected>PCD</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                </select>
                <!-- Ícone -->
                <select name="icone" id="add-user-icon">
                    <option value="👤">👤</option>
                    <option value="👩">👩</option>
                    <option value="👨">👨</option>
                    <option value="👧">👧</option>
                    <option value="🧑">🧑</option>
                    <option value="🧒">🧒</option>
                    <option value="🧔">🧔</option>
                    <option value="👨‍🦱">👨‍🦱</option>
                    <option value="👱">👱</option>
                    <option value="👱‍♀️">👱‍♀️</option>
                </select>
                <!-- Tipo de Cartão -->
                <!-- <select name="op_card" id="op_card">
                    <option value="Aluno">Aluno</option>
                    <option value="Funcionário">Funcionário</option>
                </select> -->
                <label for="" id="labelforRsp">Responsável:</label>
                <!-- Nome do Responsável -->
                <input type="text" name="nomeResponsavel" id="NomeResponsavel" placeholder="Nome do Responsável" required>
                <!-- Email do Responsável -->
                <input type="email" name="emailResponsavel" id="EmailResponsavel" placeholder="Email do Responsável" required>
                <!-- Telefone do Responsável -->
                <input type="tel" name="telefoneResponsavel" id="TelefoneResponsavel" placeholder="Telefone do Responsável" maxlength="11" required>
                <!-- RG do Responsável -->
                <input type="text" name="RGResponsavel" id="RGResponsavel" placeholder="RG do Responsável"  maxlength="10"required>
                <!-- CPF do Responsável -->
                <input type="text" name="CPFResponsavel" id="CPFResponsavel" placeholder="CPF do Responsável" maxlength="11" required>
            </div> 
               <button type="submit" class="btn-submit" id="add_aluno">Adicionar</button>
            </form>
       
    </div>
</div>
@endsection