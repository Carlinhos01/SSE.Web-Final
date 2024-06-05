<div class="add-event-wrapper" id="addEventModal">
    <!-- Cabeçalho do wrapper -->
    <div class="add-event-header">
        <div class="title">Lembretes</div>
        <i class="fas fa-times close"></i>
    </div>
    <!-- Corpo do wrapper -->
    <div class="add-event-body">
        <!-- Campo para o título -->
        <h1 class="enunciado">Título:</h1>
        <div class="add-event-input">
            <div class="ef_traz"></div>
            <input type="text" placeholder="Título que será salvo no lembrete" class="event-name" />
        </div>
        <!-- Campo para a descrição -->
        <h1 class="enunciado">Descrição:</h1>
        <div class="add-event-input">
            <div class="ef_traz"></div>
            <input type="text" placeholder="Descrição que será salvo no lembrete" class="event-descricao" />
        </div>
        <!-- Campos para o horário -->
        <h1 class="enunciado">Horário:</h1>
        <div class="cont_time">
            <!-- Início -->
            <div class="add-event-input time">
                <div class="ef_traz"></div>
                <input type="text" placeholder="00:00" class="event-time-from" />
            </div>
            <!-- Fim -->
            <div class="add-event-input time">
                <div class="ef_traz"></div>
                <input type="text" placeholder="00:00" class="event-time-to" />
            </div>
        </div>
        <!-- Adicionar cor e contato -->
        <h1 class="enunciado">Adicionar:</h1>
        <div class="cont_times">
            <!-- Selecionar cor -->
            <div class="add-event-input input-cor">
                <div class="ef_traz bt_cor"></div>
                <div class="cor_escolhida bt_cor"></div>
                <input type="button" class="bt_cor" onclick="openModal()" />
            </div>
            <!-- Adicionar contato -->
            <div class="add-event-input input-cont">
                <div class="cont-user-geral">
                    <div class="cont_conteiner">
                        <div class="ef_traz bt_cont"></div>
                        <input type="button" class="bt_conts" id="bt_conts" value="+" />
                    </div>
                    <div class="selected-users-container" id="selectedUsersContainer"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- Rodapé do wrapper -->
    <div class="add-event-footer">
        <button class="add-event-btn">Adicionar Lembrete</button>
        <div class="ef_traz-btn"></div>
    </div>
</div>
