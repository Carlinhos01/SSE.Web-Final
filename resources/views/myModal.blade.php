@yield('content')
<div id="myModal" class="modal-cont-user">
    <div class="modal-content-user">
        <!-- Barra de Navegação -->
        <div class="desc-user-inform">

        </div>

        <div class="navbar">
            <a href="#" class="nav-item" id="btn-dados"
                onclick="toggleModalActive('dados'); toggleNavActive('btn-dados')">Dados</a>
            <!-- <a href="#" class="nav-item" id="btn-chat"
                onclick="toggleModalActive('chat'); toggleNavActive('btn-chat')">Chat</a> -->
            <a href="#" class="nav-item" id="btn-responsavel"
                onclick="toggleModalActive('responsavel'); toggleNavActive('btn-responsavel')">Responsável</a>
            <div class="line"></div>
        </div>
        <div class="modal-screen active cont-modal-inicio" id="inicio">
            Bem vindo
        </div>
        <div class="modal-screen cont-modal-user-dados" id="dados">
                <!-- Aqui é onde os dados do usuário serão exibidos -->
                <div class="cont-dados">
                    
                </div>
            </div>
        <!-- chat -->
        <div class="modal-screen cont-modal-user-chat" id="chat">
            
        </div>
        <!-- fim chat -->
        <div class="modal-screen cont-modal-user-responsavel" id="responsavel">
        <div class="cont-dados-resp"> 
                
            </div>
        </div>
    </div>
</div>
