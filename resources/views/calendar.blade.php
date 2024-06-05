<!-- Container principal para o calendário -->
<div class="container">

<!-- Lado esquerdo: calendário -->
<div class="left">

    <div class="calendar">
        <!-- Cabeçalho do mês -->
        <div class="month">
            <i class="fas fa-angle-left prev"></i>
            <div class="date">dezembro 2015</div><!-- não tem nada com essa div no css -->
            <i class="fas fa-angle-right next"></i>
        </div>
        <!-- Dias da semana -->
        <div class="weekdays">
            <div class="semana_dia">Dom</div>
            <div class="semana_dia">Seg</div>
            <div class="semana_dia">Ter</div>
            <div class="semana_dia">Qua</div>
            <div class="semana_dia">Qui</div>
            <div class="semana_dia">Sex</div>
            <div class="semana_dia">Sáb</div>
        </div>
        <!-- Dias do mês -->
        <div class="days"></div>
        <!-- Navegação e botão para ir para hoje -->
        <div class="goto-today">
            <div class="goto">
                <input type="text" placeholder="mm/yyyy" class="date-input" />
                <button class="goto-btn">Go</button>
            </div><div class="today-date">
        <div class="event-day">Seg</div>
        <div class="event-date">12 de dezembro de 2022</div>
    </div>
            <button class="today-btn">Hoje</button>
        </div>
    </div>
</div>
<!-- Lado direito: eventos e adicionar evento -->
<div class="right">
    
    <div class="events"></div>
    <button class="add-event">
        <i class="fas fa-plus"></i>
    </button>
</div>
</div>