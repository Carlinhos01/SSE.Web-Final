<div class="container-user">
    <div class="conteiner-user-unic">
        <div class="cont-add-user">
          <div class="pesquisa-user">
            <input type="text" id="searchInputUser" class="pess-input-user" placeholder="Pesquisar Pessoa..." autocomplete="on">
            <button id="add-user-btn" class="btn-unic-pess">
              <i class="fi fi-br-add"></i>
            </button>
          </div>
          <div id="add-user" class="add-user">
            <ul class="ul">
              <!-- User items will be appended here -->
            </ul>
          </div>
        </div>
      </div>
    
    

    <div class="conteiner-user-group">
        <div class="cont-add-group cont-add-user">
            <div class="pesquisa-group pesquisa-user">
                <input type="text" id="searchInputGroup" class="pess-input-group pess-input-user" placeholder="Pesquisar Usuários">
                <button class="btn-unic-group btn-unic-pess">
                    <i class="fi fi-br-add"></i>
                </button>
            </div>
            <div id="add-group" class="add-group">
                <ul>
                    <!-- Os grupos serão exibidos aqui -->
                </ul>
            </div>
        </div>
    </div>

    
</div>
    @yield('content')