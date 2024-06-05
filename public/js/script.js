
const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to"),
  addEventDescricion = document.querySelector(".event-descricao"),
  addEventSubmit = document.querySelector(".add-event-btn"),

  form = document.getElementById('add-user-form'),
  nomeAlunoInput = document.getElementById('add-user-name'),
  emailInput = document.getElementById('add-user-email'),
  telefoneInput = document.getElementById('telefone'),
  dtNascInput = document.getElementById('add-user-dt_nasc'),
  generoSelect = document.getElementById('add-user-genero'),
  cursoInput = document.getElementById('cur-ser-ens'),
  instituicaoInput = document.getElementById('instituicao'),
  cpfInput = document.getElementById('add-user-cpf'),
  rgInput = document.getElementById('add-user-rg'),
  pcdSelect = document.getElementById('add-user-pcd'),
  iconeSelect = document.getElementById('add-user-icon'),
  opCardSelect = document.getElementById('op_card'),
  nomeResponsavelInput = document.getElementById('NomeResponsavel'),
  emailResponsavelInput = document.getElementById('EmailResponsavel'),
  telefoneResponsavelInput = document.getElementById('TelefoneResponsavel'),
  rgResponsavelInput = document.getElementById('RGResponsavel'),
  cpfResponsavelInput = document.getElementById('CPFResponsavel');

// Lista de usuários selecionados
const selectedUsers = [];

// Array com os nomes dos meses
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Array para armazenar eventos
const eventsArr = [];

// Variáveis para armazenar a data atual e o mês e ano atuais
let today = new Date(),
  activeDay,
  month = today.getMonth(),
  year = today.getFullYear();

// Seleciona os elementos do DOM necessários para a funcionalidade de pesquisa e seleção de usuários
const btConts = document.querySelector(".bt_conts"),
  modalPesPessoa = document.getElementById("modal_pes-pessoa"),
  closeModalPesPessoa = document.querySelector(".close-modal"),
  searchInput = document.getElementById("searchInput"),
  pessoasContainer = document.getElementById("pessoasContainer"),
  selectedUsersList = document.getElementById("selectedUsersList");

let allUsers = [];

// Função para abrir o modal de adição de usuário
function openAddModal() {
  const modal = document.querySelector(".addmodal");
  modal.style.display = "block";
}

// Função para fechar o modal de adição de usuário
function closeAddModal() {
  const modal = document.querySelector(".addmodal");
  modal.style.display = "none";
}

// Evento para abrir o modal de adição de usuário quando o botão é clicado
document.getElementById("add-user-btn").addEventListener("click", openAddModal);

// Evento para fechar o modal de adição de usuário quando o usuário clica no botão de fechar (X)
document
  .querySelector(".addmodal-close")
  .addEventListener("click", closeAddModal);

// Evento para fechar o modal de adição de usuário quando o usuário clica fora da área do modal
window.addEventListener("click", function (event) {
  const modal = document.querySelector(".addmodal");
  if (event.target == modal) {
    closeAddModal();
  }
});

// Função para salvar os usuários no localStorage
function saveUsers() {
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
}

// Carregar os usuários quando a página é carregada
window.addEventListener("DOMContentLoaded", loadUsers);

// Função para preencher a lista de usuários no add-user
// Função para preencher a lista de usuários no add-user
function fillAddUserList(users = allUsers) {
  const addUserList = document.getElementById("add-user");

  // Limpa a lista antes de adicionar novos usuários
  addUserList.innerHTML = "";

  // Cria uma lista não ordenada (ul) para os usuários
  const userList = document.createElement("ul");

  // Adiciona cada usuário como um item de lista (li)
  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${user.icon} ${user.name}`;
    listItem.classList.add("user-item");
    listItem.addEventListener("click", () => {
      // Aqui vamos chamar a função toggleSelectUser e passar o usuário e o elemento clicado
      toggleSelectUser(user, listItem);
      // Ao clicar em um usuário, preencha a div com a classe 'desc-user-inform' com o ícone e o nome do usuário clicado
      const descUserInform = document.querySelector(".desc-user-inform");
      descUserInform.innerHTML = `
          <div class="cont-user-icon">
            <div class="cont-user-icon-dentro">
              <i class="user-icon-modal">${user.icon}</i>
            </div>
            <div class="cont-user-icon-traz">
            </div>
          </div>
          <div class="cont-user-name">
            <span class="user-name">${user.name}</span>
          </div>
          <div class="cont-close-modal">
            <span class="close-modal" onclick="closeUserModal('myModal')">&times;</span>
          </div>
          
          
        `;
    });
    userList.appendChild(listItem); // Adiciona o item de lista à lista de usuários
  });

  // Adiciona a lista de usuários ao elemento add-user
  addUserList.appendChild(userList);
}

// Preenche a lista de usuários ao carregar a página
fillAddUserList();







let selectedUser = null; // Usuário selecionado

// Evento para adicionar usuário quando o formulário é enviado
document.getElementById("add-user-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Obter os valores dos campos do formulário...
  const userIcon = document.getElementById("add-user-icon").value;
  const nomeAluno = document.getElementById('add-user-name').value;
  const email = document.getElementById('add-user-email').value;
  const telefone = document.getElementById('telefone').value;
  const dtNasc = document.getElementById('add-user-dt_nasc').value;
  const genero = document.getElementById('add-user-genero').value;
  const curso = document.getElementById('cur-ser-ens').value;
  const instituicao = document.getElementById('instituicao').value;
  const cpf = document.getElementById('add-user-cpf').value;
  const rg = document.getElementById('add-user-rg').value;
  const pcd = document.getElementById('add-user-pcd').value;
  const nomeResponsavel = document.getElementById('NomeResponsavel').value;
  const emailResponsavel = document.getElementById('EmailResponsavel').value;
  const telefoneResponsavel = document.getElementById('TelefoneResponsavel').value;
  const rgResponsavel = document.getElementById('RGResponsavel').value;
  const cpfResponsavel = document.getElementById('CPFResponsavel').value;

  // Criar o novo usuário
  const usuario = {
    id: allUsers.length + 1,
    name: nomeAluno,
    email: email,
    telefone: telefone,
    icon: userIcon,
    data_de_Nascimento: dtNasc,
    genero: genero,
    curso: curso,
    instituicao: instituicao,
    cpf: cpf,
    rg: rg,
    pcd: pcd,
    responsavel: {
      nome: nomeResponsavel,
      email: emailResponsavel,
      telefone: telefoneResponsavel,
      rg: rgResponsavel,
      cpf: cpfResponsavel
    }
  };

  // Adicionar o novo usuário à lista de usuários
  allUsers.push(usuario);
  console.log("Novo usuário cadastrado:", usuario);

  // Fechar o modal...
  closeAddModal();

  // Salvar os usuários...
  saveUsers();
  fillAddUserList();
});

// Função para exibir os dados apenas do usuário selecionado
function exibirDadosUsuarioSelecionado() {
  // Seleciona o elemento onde os dados serão inseridos
  const contDados = document.querySelector('.cont-dados');

  // Remove os dados dos usuários que não estão selecionados
  contDados.innerHTML = ''; // Limpa os dados exibidos

  // Preenche os dados apenas do usuário selecionado
  if (selectedUser) {
    preencherDadosUsuario(selectedUser);
    if (selectedUser.responsavel) {
      preencherDadosResponsavel(selectedUser.responsavel);
    }
  }
}


// Função para preencher os dados do usuário na tela
function preencherDadosUsuario(usuario) {
  // Seleciona o elemento onde os dados serão inseridos
  const contDados = document.querySelector('.cont-dados');

  // Define os dados do usuário em HTML
  const dadosHTML = `
      <div class="cont-0">
          <h3>ID:</h3>
          <div class="cont-id">
              <p>${usuario.id}</p>
          </div>
      </div>
      <div class="cont-1 oi">
          <h3>Nome:</h3>
          <div class="cont-nome">
              <p>${usuario.name}</p>
          </div>
      </div>
      <div class="cont-2 oi">
          <h3>Email:</h3>
          <div class="cont-email">
              <p>${usuario.email}</p>
          </div>
      </div>
      <div class="cont-3 oi">
          <h3>Data de Nascimento:</h3>
          <div class="cont-dtNasc">
              <p>${usuario.data_de_Nascimento}</p>
          </div>
      </div>
      <div class="cont-4 oi">
          <h3>Gênero:</h3>
          <div class="cont-genero">
              <p>${usuario.genero}</p>
          </div>
      </div>
      <div class="cont-5 oi">
          <h3>Telefone:</h3>
          <div class="cont-telefone">
              <p>${usuario.telefone}</p>
          </div>
      </div>
      <div class="cont-6 oi">
          <h3>Curso/Série/Ensino:</h3>
          <div class="cont-Cse">
              <p>${usuario.curso}</p>
          </div>
      </div>
      <div class="cont-7 oi">
          <h3>Instituição:</h3>
          <div class="cont-instituição">
              <p>${usuario.instituicao}</p>
          </div>
      </div>
      <div class="cont-8 oi">
          <h3>Pessoa com Deficiência:</h3>
          <div class="cont-nome">
              <p>${usuario.pcd}</p>
          </div>
      </div>
      <div class="cont-9 oi">
          <h3>RG:</h3>
          <div class="cont-nome">
              <p>${usuario.rg}</p>
          </div>
      </div>
      <div class="cont-10 oi">
          <h3>CPF:</h3>
          <div class="cont-nome">
              <p>${usuario.cpf}</p>
          </div>
      </div>
  `;

  // Adiciona os dados do usuário ao elemento
  contDados.innerHTML = dadosHTML;

  saveUsers()
}

function preencherDadosResponsavel(responsavel) {
  // Seleciona o elemento onde os dados do responsável serão inseridos
  const contDadosResp = document.querySelector('.cont-dados-resp');

  // Limpa o conteúdo anterior antes de adicionar os novos dados do responsável
  contDadosResp.innerHTML = '';

  // Define os dados do responsável em HTML
  const dadosResponsavelHTML = `
      <div class="cont-12">  
          <h3>ID:</h3>
          <div class="cont-id">
              <p>${responsavel.id}</p>
          </div>
      </div>
      <div class="cont-13 oi">
          <h3>Nome:</h3>
          <div class="cont-nome">
              <p>${responsavel.nome}</p>
          </div>
      </div>
      <div class="cont-14 oi">
          <h3>Email:</h3>
          <div class="cont-email">
              <p>${responsavel.email}</p>
          </div>
      </div>
      <div class="cont-15 oi">
          <h3>Telefone:</h3>
          <div class="cont-telefone">
              <p>${responsavel.telefone}</p>
          </div>
      </div>
      <div class="cont-16 oi">
          <h3>RG:</h3>
          <div class="cont-nome">
              <p>${responsavel.rg}</p>
          </div>
      </div>
      <div class="cont-17 oi">
          <h3>CPF:</h3>
          <div class="cont-nome">
              <p>${responsavel.cpf}</p>
          </div>
      </div>
  `;

  // Adiciona os dados do responsável ao elemento
  contDadosResp.innerHTML = dadosResponsavelHTML;
}


// Função para salvar os usuários no armazenamento local
function saveUsers() {
  localStorage.setItem('allUsers', JSON.stringify(allUsers));
}

// Carregar os usuários ao carregar a página
window.addEventListener('load', function() {
  loadUsers();
  // Verifica se há um usuário selecionado anteriormente
  if (selectedUser) {
    // Encontra o índice do usuário selecionado na lista allUsers
    const selectedIndex = allUsers.findIndex(user => user.id === selectedUser.id);
    if (selectedIndex !== -1) {
      // Se o usuário selecionado estiver na lista, exibe seus dados
      selecionarUsuario(selectedIndex);
    } else {
      // Caso contrário, seleciona o primeiro usuário da lista
      selectedUser = allUsers[0];
      exibirDadosUsuarioSelecionado();
    }
  } else if (allUsers.length > 0) {
    // Se não houver usuário selecionado anteriormente, seleciona o primeiro usuário da lista
    selectedUser = allUsers[0];
    exibirDadosUsuarioSelecionado();
  }
});





function filterUsers() {
  const searchInput = document
    .getElementById("searchInputUser")
    .value.trim()
    .toLowerCase(); // Obtém o valor do campo de pesquisa e converte para minúsculas

  // Verifica se o campo de pesquisa está vazio
  if (searchInput === "") {
    fillAddUserList(allUsers); // Se estiver vazio, preenche a lista com todos os usuários
    return; // Retorna para evitar a filtragem adicional
  }

  // Filtra os usuários cujos nomes contêm o texto de pesquisa
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchInput)
  );

  fillAddUserList(filteredUsers); // Preenche a lista de usuários filtrados
}

// Carregar os usuários quando a página é carregada
window.addEventListener("DOMContentLoaded", loadUsers);

// Evento de input para a barra de pesquisa
document
  .getElementById("searchInputUser")
  .addEventListener("input", filterUsers);




  
  
  let allGroups = [];

  // Função para abrir o modal de adição de grupo
  function openAddGroupModal() {
      const modal = document.getElementById("userListModal");
      modal.style.display = "block";
  }
  
  // Função para fechar o modal de adição de grupo
  function closeAddGroupModal() {
      const modal = document.getElementById("userListModal");
      modal.style.display = "none";
  }
  
  // Evento para fechar o modal de adição de grupo quando o usuário clica no botão de fechar (X)
  document.querySelector(".close-grupo").addEventListener("click", closeAddGroupModal);
  
  // Evento para fechar o modal de adição de grupo quando o usuário clica fora da área do modal
  window.addEventListener("click", function (event) {
      const modal = document.getElementById("userListModal");
      if (event.target == modal) {
          closeAddGroupModal();
      }
  });
  
  // Função para adicionar ou remover usuários da lista de selecionados
  function toggleSelectUser(user, element) {
      const userIndex = selectedUsers.findIndex(selectedUser => selectedUser.id === user.id);
  
      if (userIndex === -1) {
          // Usuário não está selecionado, adicionar à lista
          selectedUsers.push(user);
          element.classList.add("selecteds");
      } else {
          // Usuário já está selecionado, remover da lista
          selectedUsers.splice(userIndex, 1);
          element.classList.remove("selecteds");
      }
  }
  
  // Função para preencher a lista de usuários no modal de adição de grupo
  function fillAddGroupList(users = allUsers) {
      const addUserList = document.getElementById("userList-grupo");
  
      // Limpa a lista antes de adicionar novos usuários
      addUserList.innerHTML = "";
  
      // Cria uma lista não ordenada (ul) para os usuários
      const userList = document.createElement("div");
  
      // Adiciona cada usuário como um item de lista (li)
      users.forEach((user) => {
          const listItem = document.createElement("button");
          listItem.classList.add("user-button-modal");
  
          const userIcon = document.createElement("span");
          userIcon.classList.add("user-icon-grup");
          userIcon.innerHTML = user.icon;
  
          const userName = document.createElement("span");
          userName.classList.add("user-name-grup");
          userName.textContent = user.name;
  
          listItem.appendChild(userIcon);
          listItem.appendChild(userName);
  
          // Verificar se o usuário já está selecionado
          if (selectedUsers.some(selectedUser => selectedUser.id === user.id)) {
              listItem.classList.add("selecteds");
          }
  
          listItem.addEventListener("click", (event) => {
              // Impedir a propagação do evento para evitar a abertura do modal
              event.stopPropagation();
  
              // Aqui vamos chamar a função toggleSelectUser e passar o usuário e o elemento clicado
              toggleSelectUser(user, listItem);
          });
  
          userList.appendChild(listItem); // Adiciona o item de lista à lista de usuários
      });
  
      // Adiciona a lista de usuários ao elemento add-user
      addUserList.appendChild(userList);
  }
  
  // Função para exibir os grupos na div #add-group
  function displayGroups() {
    const groupContainer = document.querySelector("#add-group ul");

    // Limpa a lista antes de adicionar novos grupos
    groupContainer.innerHTML = "";

    // Adiciona cada grupo como um item de lista (div)
    allGroups.forEach((group, index) => {
        const listItem = document.createElement("div");
        listItem.classList.add("groupBox");

        // Div para o nome do grupo
        const groupNameDiv = document.createElement("div");
        groupNameDiv.textContent = group.name;
        groupNameDiv.classList.add("groupName");

        // Div para a quantidade de membros
        const groupMembersDiv = document.createElement("div");
        groupMembersDiv.textContent = `${group.users.length} Membros`;
        groupMembersDiv.classList.add("groupMembers");

        // Adiciona as divs ao item de lista
        listItem.appendChild(groupNameDiv);
        listItem.appendChild(groupMembersDiv);

        // Adiciona o item de lista ao container de grupos
        groupContainer.appendChild(listItem);
    });
}

  
  // Função para salvar os grupos no localStorage
  function saveGroups() {
      localStorage.setItem("allGroups", JSON.stringify(allGroups));
  }
  
  // Função para carregar os grupos do localStorage
  function loadGroups() {
      const storedGroups = localStorage.getItem("allGroups");
      if (storedGroups) {
          allGroups = JSON.parse(storedGroups);
      }
      displayGroups();
  }
  
  // Evento para criar o grupo quando o formulário é enviado
  document.querySelector(".submit").addEventListener("click", function (event) {
      event.preventDefault();
  
      // Obter o nome do grupo
      const groupName = document.getElementById('group-name').value;
  
      if (groupName.trim() === "") {
          alert("Por favor, insira um nome para o grupo.");
          return;
      }
  
      // Criar o novo grupo
      const group = {
          name: groupName,
          users: [...selectedUsers] // Cria uma cópia dos usuários selecionados
      };
  
      // Adicionar o novo grupo à lista de grupos
      allGroups.push(group);
  
      // Salvar os grupos
      saveGroups();
  
      // Exibir os grupos atualizados
      displayGroups();
  
      // Fechar o modal
      closeAddGroupModal();
  
      // Limpar o nome do grupo e os usuários selecionados
      document.getElementById('group-name').value = '';
      selectedUsers.length = 0;
  
      // Atualizar a lista de usuários para remover a seleção
      fillAddGroupList();
  });
  
  // Função para carregar os usuários do localStorage
  function loadUsers() {
    const storedUsers = localStorage.getItem("allUsers");
    if (storedUsers) {
      allUsers = JSON.parse(storedUsers);
      fillAddUserList(allUsers); // Preencher a lista de usuários para todos os casos
      fillAddGroupList(allUsers); // Preencher a lista de usuários no modal de adição de grupo
    }
  }
  
  
  // Carregar os usuários e os grupos quando a página é carregada
  window.addEventListener("DOMContentLoaded", function () {
      loadUsers();
      loadGroups();
  });
  
  // Evento de input para a barra de pesquisa de usuários
  document.getElementById("searchInputGroup").addEventListener("input", function () {
      const searchInput = this.value.trim().toLowerCase(); // Obtém o valor do campo de pesquisa e converte para minúsculas
  
      // Filtra os usuários cujos nomes contêm o texto de pesquisa
      const filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(searchInput));
      fillAddGroupList(filteredUsers); // Preenche a lista de usuários filtrados
  });
  
  // Evento de clique para abrir o modal ao clicar no botão btn-unic-group
  document.querySelector(".btn-unic-group").addEventListener("click", openAddGroupModal);
  


  function listGrupos(searchTerm) {
    gruposContainer.innerHTML = "";
    const filteredGrupos = allGrupos.filter((grupo) =>
      grupo.name.toLowerCase().includes(searchTerm)
    );
    filteredGrupos.forEach(createGrupoElement);
  }

  function createGrupoElement(grupo) {
    const grupoDiv = document.createElement("div");
    grupoDiv.textContent = `${grupo.icon} ${grupo.name}`;
    grupoDiv.classList.add("grupo-items");
    grupoDiv.classList.add("mod-pess-grupo-unit");
    grupoDiv.addEventListener("click", (event) => toggleSelectGrupo(grupo, grupoDiv, event));
    gruposContainer.appendChild(grupoDiv);
  }

// Função para fechar o modal de pesquisa de grupos
function closeModal() {
  modalPesPessoa.style.display = "none";
}

// Função para abrir o modal de pesquisa de grupos
function openModal() {
  modalPesPessoa.style.display = "block";
  listGrupos("");
}

function clickOutsideModal(event) {
  if (event.target === modalPesPessoa) {
    closeModal();
  }
}

// Função para realizar a pesquisa de grupos
function searchGrupos() {
  const searchTerm = searchInput.value.toLowerCase();
  listGrupos(searchTerm);
}

// Evento para fechar o modal ao clicar no botão "Continuar"
document.querySelector('.close-modal').addEventListener('click', closeModal);

// Adiciona event listener para fechar modal ao clicar fora dele
window.addEventListener("click", clickOutsideModal);

// Adiciona event listener para pesquisa de grupos
searchInput.addEventListener("input", searchGrupos);
listGrupos







//------------------------------------------------------------------------------------------------//

/**
 * Funções gerais
 */

// Função para obter os eventos do armazenamento local
function getEvents() {
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

// Função para salvar os eventos no armazenamento local
// Função para salvar os eventos no armazenamento local
function saveEvents() {
  // Verifica se já existem eventos no armazenamento local para o dia atual
  const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
  const currentDateEventsIndex = existingEvents.findIndex(event => event.day === activeDay && event.month === month + 1 && event.year === year);

  if (currentDateEventsIndex !== -1) {
    // Se já houver eventos para o dia atual, atualiza esses eventos
    existingEvents[currentDateEventsIndex].events = eventsArr;
  } else {
    // Se não houver eventos para o dia atual, cria um novo lembrete
    existingEvents.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: eventsArr
    });
  }

  // Salva os eventos atualizados no armazenamento local
  localStorage.setItem("events", JSON.stringify(existingEvents));
}


function getSelectedUsers() {
  const selectedUsers = localStorage.getItem("selectedUsers");
  return selectedUsers ? JSON.parse(selectedUsers) : [];
}




function saveSelectedUsers(users) {
  localStorage.setItem("selectedUsers", JSON.stringify(users));
}

// Função para obter a cor selecionada
function getColor() {
  return localStorage.getItem("selectedColor") || "#ffffff";
}

// Função para salvar a cor selecionada
function saveColor(color) {
  localStorage.setItem("selectedColor", color);
}

// Função para obter o dia ativo
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// Função para atualizar os eventos exibidos
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        const colorStyle = `background-color: ${event.color};`;
        events += `
        <div class="event">
	        <div class="cont-color">
		        <div class="color-select-event" style="${colorStyle}"></div>
	        </div>
	        <div class="cont-principal">
		        <div class="event-title"><h1>${event.title}</h1></div>
		        <div class="event-time"><p>${event.time}</p></div>
	        </div>
	        <div class="left-confg">
		        <div class="cont-config">
              <i class="fi fi-sr-settings img-confg"></i>
		        </div>
	        </div>
        </div>
        `;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
                <img src="img/amico.png" alt="">
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

// Função para inicializar o calendário
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

// Função para ir para o mês anterior
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// Função para ir para o próximo mês
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// Função para adicionar ouvintes de evento aos dias do calendário
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      days.forEach((day) => {
        day.classList.remove("active");
      });
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

// Função para ir para uma data específica
function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}


function showEventModal(event) {
  const colorStyle = `background-color: ${event.color};`;

  const selectedUsersContainer = document.getElementById("selectedUsersContainer");
  const selectedUserDivs = selectedUsersContainer.querySelectorAll(".wrapper-user");

  const selectedUsersHTML = Array.from(selectedUserDivs).map(userDiv => {
    return `
      <div class="selected-user">
        ${userDiv.innerHTML}
      </div>
    `;
  }).join("");

  const modalContent = `
    <div class="event-modal-content">
      <div class="modal-cont">
        <div class="content-color" style="${colorStyle}">
          <div class="close-btm">x</div>
        </div>
        <div class="cont-modal-conteiner">
          <div class="cont-conteiner-pess-time-desc">
            <div class="cont-title">
              <h2>${event.title}</h2>
            </div>
            <div class="cont-descrição">
              <p>${event.descrição}</p>
            </div>
            <div class="cont-time">
              <p>${event.time}</p>
            </div>
          </div>
          <div class="cont-users">
            <strong>Usuários:</strong>
            <div class="contt-user">
              ${selectedUsersHTML}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const modal = document.createElement("div");
  modal.className = "event-modal";
  modal.innerHTML = modalContent;

  document.body.appendChild(modal);

  const closeModalBtn = modal.querySelector(".close-btm");
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}


// Função para salvar os eventos no armazenamento local
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// Função para salvar a cor selecionada no armazenamento local
function saveColor(color) {
  localStorage.setItem("selectedColor", color);
}

// Função para salvar os usuários selecionados no armazenamento local
function saveSelectedUsers(users) {
  localStorage.setItem("selectedUsers", JSON.stringify(users));
}





// Função para fechar o modal
function closeEventModal() {
  const modal = document.querySelector(".event-modal");
  if (modal) {
    modal.remove(); // Remove o modal do DOM
  }
}

// Evento para fechar o modal ao clicar em event-modal-content
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("event-modal-content")) {
    closeEventModal();
  }
});
// Função para criar elemento de usuário
// Função para criar elemento de usuário
function createUserElement(user) {
  const userDiv = document.createElement("div");
  userDiv.textContent = `${user.icon} ${user.name}`;
  userDiv.classList.add("user-items");
  userDiv.classList.add("mod-pess-user-unit");
  userDiv.addEventListener("click", (event) => toggleSelectUser(user, userDiv, event));
  pessoasContainer.appendChild(userDiv);
}



// Função para listar usuários com base no termo de pesquisa
function listUsers(searchTerm) {
  pessoasContainer.innerHTML = "";
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );
  filteredUsers.forEach(createUserElement);
}

// Função para fechar o modal de pesquisa de pessoas
function closeModal() {
  modalPesPessoa.style.display = "none";
}

// Função para abrir o modal de pesquisa de pessoas
function openModal() {
  modalPesPessoa.style.display = "block";
  listUsers("");
}

// Função para fechar o modal ao clicar fora dele
function clickOutsideModal(event) {
  if (event.target === modalPesPessoa) {
    closeModal();
  }
}

// Função para realizar a pesquisa de usuários
function searchUsers() {
  const searchTerm = searchInput.value.toLowerCase();
  listUsers(searchTerm);
}

// Funções para adicionar e remover usuário da lista de usuários selecionados
// adiciona
function addUserToSelected(user) {
  const listItem = document.createElement("div");
  listItem.textContent = `${user.icon} ${user.name}`;
  listItem.id = `user-${user.id}`;
  listItem.className = `mod-pess-unic-pess`;
  selectedUsersList.appendChild(listItem);
}

// remove
function removeUserFromSelected(userId) {
  const listItem = document.getElementById(`user-${userId}`);
  if (listItem) {
    listItem.remove();
  }
}



// Função para alternar a seleção de um usuário
function toggleSelectUser(user, element, event) {
  const index = selectedUsers.findIndex((u) => u.id === user.id);
  const myModal = document.getElementById("myModal");
  const addUserElement = document.querySelector("#add-user ul");

  if (index === -1) {
    selectedUsers.push(user);
    saveSelectedUsers(selectedUsers);
    element.classList.add("selected");
    addUserToSelected(user);
    addUserToWrapper(user, addUserElement);

    // Definir o usuário selecionado
    selectedUser = user;

    // Exibir os dados do usuário selecionado
    exibirDadosUsuarioSelecionado();

    // Verificar se o clique ocorreu dentro do contêiner específico para abrir o modal
    if (element.closest('#add-user ul')) {
      myModal.style.display = "flex"; // Abrir o modal myModal
    }
  } else {
    selectedUsers.splice(index, 1);
    saveSelectedUsers(selectedUsers);
    element.classList.remove("selected");
    removeUserFromSelected(user.id);
    removeUserFromWrapper(user.id, addUserElement);

    // Verificar se o usuário desselecionado é o usuário selecionado atualmente
    if (selectedUser && selectedUser.id === user.id) {
      selectedUser = null; // Limpar o usuário selecionado
    }

    // Verificar se o clique ocorreu dentro do contêiner específico para fechar o modal
    if (element.closest('#add-user ul')) {
      myModal.style.display = "none"; // Fechar o modal myModal
    }
  }
}

// Atualizar a função createUserElement para passar o evento de clique
function createUserElement(user) {
  const userDiv = document.createElement("div");
  userDiv.textContent = `${user.icon} ${user.name}`;
  userDiv.classList.add("user-items");
  userDiv.classList.add("mod-pess-user-unit");
  userDiv.addEventListener("click", (event) => toggleSelectUser(user, userDiv, event));
  pessoasContainer.appendChild(userDiv);
}



// Adicionar event listener para fechar modal ao clicar fora dele
window.addEventListener("click", clickOutsideModal);

// Funções auxiliares para manipulação de elementos
function addUserToWrapper(user, addUserElement) {
  const userItem = document.createElement("li");
  userItem.classList.add("user-item");
  userItem.textContent = user.name; // Supondo que o objeto user tenha uma propriedade name
  userItem.dataset.userId = user.id; // Adiciona um atributo de dados com o ID do usuário
  addUserElement.appendChild(userItem);
}

function removeUserFromWrapper(userId, addUserElement) {
  const userItem = addUserElement.querySelector(`.user-item[data-user-id="${userId}"]`);
  if (userItem) {
    addUserElement.removeChild(userItem);
  }
}

// Funções mockup para salvar e remover usuários selecionados
function saveSelectedUsers(users) {
  console.log("Usuarios salvos:", users);
}

function addUserToSelected(user) {
  console.log("Usuario adicionado:", user);
}

function removeUserFromSelected(userId) {
  console.log("Usuario removido:", userId);
}


// Função para fechar o modal
function closeUserModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

// Função para fechar o modal quando clicar fora do conteúdo do modal
function closeModalOnOutsideClick() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.addEventListener("click", function (event) {
      // Verifica se o clique ocorreu dentro do conteúdo do modal
      if (!event.target.closest(".modal-content-user")) {
        modal.style.display = "none"; // Fecha o modal
      }
    });
  }
}

// Chama a função para fechar o modal ao clicar fora do conteúdo do modal
closeModalOnOutsideClick();

function removeUserFromWrapper(userId) {
  const userDiv = document.getElementById(`wrapper-user-${userId}`);
  if (userDiv) {
    userDiv.remove();

    // Remove o usuário do armazenamento local
    const selectedUsers = loadSelectedUsers().filter(user => user.id !== userId);
    saveSelectedUsers(selectedUsers);
  }
}

function loadSelectedUsers() {
  return JSON.parse(localStorage.getItem("selectedUsers")) || [];
}

// Chama a função para carregar os usuários selecionados ao carregar a página
loadSelectedUsers();


function addUserToWrapper(user) {
  const userDiv = document.createElement("div");
  userDiv.innerHTML = `<span class="user-icon">${user.icon}</span> ${user.name} <span class="remove-user"></span>`;
  userDiv.id = `wrapper-user-${user.id}`;
  userDiv.classList.add("wrapper-user");

  // Adiciona evento para mostrar aviso ao clicar no usuário
  userDiv.addEventListener("click", () => {
    showRemoveConfirmation(user, userDiv); // Mostra o aviso de remoção
  });

  const selectedUsersContainer = document.getElementById(
    "selectedUsersContainer"
  );
  selectedUsersContainer.appendChild(userDiv);

  // Salva os usuários selecionados no armazenamento local
  const selectedUsers = loadSelectedUsers();
  selectedUsers.push(user);
  saveSelectedUsers(selectedUsers);
}



function showRemoveConfirmation(user, userDiv) {
  const confirmDelete = document.createElement("div");
  confirmDelete.className = "confirm-delete";
  confirmDelete.innerHTML = `
   <div class="confirm-delete-box">
    <p>Do you want to remove ${user.name}?</p>
    <button class="delete-yes">Yes</button>
    <button class="delete-no">No</button>
    </div>
  `;

  document.body.appendChild(confirmDelete);

  const deleteYes = confirmDelete.querySelector(".delete-yes");
  const deleteNo = confirmDelete.querySelector(".delete-no");

  // Evento para confirmar remoção
  deleteYes.addEventListener("click", function () {
    userDiv.remove();
    confirmDelete.remove();
    toggleSelectUser(user, userDiv);
  });

  // Evento para cancelar remoção
  deleteNo.addEventListener("click", function () {
    confirmDelete.remove();
  });
}

// Carrega eventos do armazenamento local
getEvents();

// Inicializa o calendário ao carregar a página
initCalendar();

//------------------------------------------------------------------------------------------------//

/**
 * Eventos
 */

// Adiciona eventos aos botões de mês anterior e próximo
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// Adiciona ouvintes de eventos aos elementos selecionados
btConts.addEventListener("click", openModal);
closeModalPesPessoa.addEventListener("click", closeModal);
window.addEventListener("click", clickOutsideModal);
searchInput.addEventListener("input", searchUsers);

//funão para adicionar três pontos quando o texto não cobe
document.addEventListener("DOMContentLoaded", function () {
  var eventTitles = document.querySelectorAll(".events .event .event-title h1");

  eventTitles.forEach(function (title) {
    if (title.offsetWidth < title.scrollWidth) {
      var ellipsis = document.createElement("span");
      ellipsis.innerText = "...";
      ellipsis.classList.add("ellipsis");
      title.parentNode.appendChild(ellipsis);
    }
  });
});

// Função para abrir o modal de seleção de cor
document.addEventListener("DOMContentLoaded", function () {
  const corEscolhida = document.querySelector(".cor_escolhida"),
    modal = document.getElementById("modal"),
    colorOptions = document.querySelectorAll(".color-option");

  corEscolhida.addEventListener("click", function (event) {
    event.stopPropagation();
    modal.style.display = "block";
  });

  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedColor =
        this.querySelector("span:first-child").style.backgroundColor;
      corEscolhida.style.backgroundColor = selectedColor;
      saveColor(selectedColor);
      modal.style.display = "none";
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Evento para abrir confirmação de remoção ao clicar em um usuário
document.addEventListener("DOMContentLoaded", function () {
  const wrapperUsers = document.querySelectorAll(".wrapper-user");

  wrapperUsers.forEach((user) => {
    user.addEventListener("click", function () {
      const confirmDelete = document.createElement("div");
      confirmDelete.className = "confirm-delete";
      confirmDelete.innerHTML = `
        <p>Do you want to delete this user?</p>
        <button class="delete-yes">Yes</button>
        <button class="delete-no">No</button>
      `;

      document.body.appendChild(confirmDelete);

      const deleteYes = confirmDelete.querySelector(".delete-yes");
      const deleteNo = confirmDelete.querySelector(".delete-no");

      deleteYes.addEventListener("click", function () {
        user.remove();
        confirmDelete.remove();
      });

      deleteNo.addEventListener("click", function () {
        confirmDelete.remove();
      });
    });
  });
});

// Adiciona evento ao botão "Hoje"
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

// Adiciona evento ao campo de entrada de data
dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

// Adiciona evento ao botão "Ir para a data"
gotoBtn.addEventListener("click", gotoDate);

// Adiciona evento ao botão de adicionar evento
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

// Adiciona evento ao botão de fechar adição de evento
addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

// Limita a quantidade de caracteres do titulo
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 40);
});

// Limita a quantidade de caracteres da descrição
addEventDescricion.addEventListener("input", (e) => {
  addEventDescricion.value = addEventDescricion.value.slice(0, 200);
});

//deixa o botão de tempo com o formato certo : 00:00
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});
// Adiciona evento ao botão de envio de evento
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventDescricion = addEventDescricion.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  const SelectedColor = getColor();
  const SelectedUsers = getSelectedUsers();

  if (
    eventTitle === "" ||
    eventTimeFrom === "" ||
    eventTimeTo === "" ||
    eventDescricion === ""
  ) {
    alert("por favor preencha todos os campos");
    return;
  }

  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push({
          title: eventTitle,
          descrição: eventDescricion,
          time: `${eventTimeFrom} - ${eventTimeTo}`,
          color: SelectedColor,
          users: SelectedUsers,
        });
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    const eventId = Date.now(); // Gera um ID único baseado no timestamp
    eventsArr.push({
      id: eventId, // Adiciona o ID único aqui
      day: activeDay,
      month: month + 1,
      year: year,
      events: [
        {
          title: eventTitle,
          descrição: eventDescricion,
          time: `${eventTimeFrom} - ${eventTimeTo}`,
          color: SelectedColor,
          users: SelectedUsers,
        },
      ],
      color: SelectedColor,
    });
  }

  saveEvents();
  saveColor(SelectedColor);
  saveSelectedUsers(SelectedUsers);

  addEventWrapper.classList.remove("active");
  addEventDescricion.value = "";
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);

  showEventModal({
    title: eventTitle,
    descrição: eventDescricion,
    time: `${eventTimeFrom} - ${eventTimeTo}`,
    color: SelectedColor,
    users: SelectedUsers,
  });
});


// Adiciona evento ao container de eventos para deletar evento
eventsContainer.addEventListener("click", (e) => {
  const targetClass = e.target.classList;

  if (
    targetClass.contains("event") ||
    targetClass.contains("cont-principal") ||
    targetClass.contains("cont-color") ||
    targetClass.contains("left-confg") ||
    targetClass.contains("color-select-event") ||
    e.target.closest(".event-title") ||
    e.target.closest(".event-time")
  ) {
    const eventTitleElement = e.target
      .closest(".event")
      .querySelector(".event-title h1");
    const eventTitle = eventTitleElement ? eventTitleElement.innerText : null;

    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        const selectedEvent = event.events.find(
          (item) => item.title === eventTitle
        );
        if (selectedEvent) {
          showEventModal(selectedEvent);
        }
      }
    });
  }
});

userDiv.addEventListener("click", () => {
  toggleSelectUser(user, userDiv);
  addUserToWrapper(user);
});

function showUnic() {
  console.log("Botão indivíduo clicado");
  const containerUnic = document.querySelector(".conteiner-user-unic");
  const containerGroup = document.querySelector(".conteiner-user-group");
  containerUnic.style.bottom = "0";
  containerGroup.style.bottom = "-70%";
  containerUnic.style.zIndex = "12";
  containerGroup.style.zIndex = "10";
}

function showGroup() {
  console.log("Botão grupo clicado");
  const containerUnic = document.querySelector(".conteiner-user-unic");
  const containerGroup = document.querySelector(".conteiner-user-group");
  containerGroup.style.bottom = "0";
  containerUnic.style.bottom = "-70%";
  containerUnic.style.zIndex = "10";
  containerGroup.style.zIndex = "12";
}

function toggleModalActive(modalId) {
  // Remove a classe 'active' de todos os modais
  document.querySelectorAll(".modal-screen").forEach((modal) => {
    modal.classList.remove("active");
  });

  // Adiciona a classe 'active' ao modal correspondente
  const modalToShow = document.getElementById(modalId);
  modalToShow.classList.add("active");

  // Atualiza a classe 'active' nos botões de navegação
  toggleNavActive(modalId);
}

function toggleNavActive(navItemId) {
  // Remove a classe 'active' de todos os botões de navegação
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Adiciona a classe 'active' ao botão de navegação correspondente ao ID passado como argumento
  const currentBtn = document.getElementById(`btn-${navItemId}`);
  if (currentBtn) {
    currentBtn.classList.add("active");
    // Atualiza a posição da linha
    updateLinePosition(currentBtn);
  }
}

// Função para atualizar a posição da linha de acordo com o botão selecionado
function updateLinePosition(selectedNavItem) {
  const line = document.querySelector(".line");
  const navItem = selectedNavItem.getBoundingClientRect();
  const navbar = document.querySelector(".navbar").getBoundingClientRect();

  line.style.width = navItem.width + "px";
  line.style.left = navItem.left - navbar.left + "px";
}

// Seleciona todos os nav-items e adiciona um ouvinte de evento a cada um
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", function () {
    const modalId = this.getAttribute("data-target");
    toggleModalActive(modalId);
  });
});

// Atualiza a posição da linha ao carregar a página
window.addEventListener("load", function () {
  const activeNavItem = document.querySelector(".nav-item.active");
  if (activeNavItem) {
    updateLinePosition(activeNavItem);
  }
});


document.getElementById('telefone').addEventListener('input', function (e) {
  let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});














































function toggleSelection(buttonClicked) {
  const buttons = document.querySelectorAll('.btm-1, .btm-2');
  const btmGroup = document.querySelector('.btm-group');
  const efTrazBtm = document.querySelectorAll('.ef_traz-btm');
  const btm1 = document.querySelector('.btm-1');
  const btm2 = document.querySelector('.btm-2');
  const btmUnic = document.querySelector('.btm-unic');

  // Remove a classe 'selected' de todos os botões
  buttons.forEach(button => button.classList.remove('selected'));

  // Adiciona a classe 'selected' apenas ao botão clicado
  buttonClicked.classList.add('selected');

  // Remove a classe 'active' de todos os ef_traz-btm
  efTrazBtm.forEach(efTraz => efTraz.classList.remove('active'));

  // Adiciona a classe 'active' ao ef_traz-btm correspondente
  if (buttonClicked.classList.contains('btm-1')) {
    btmGroup.classList.remove('selected-bg');
    efTrazBtm[0].classList.add('active');
    efTrazBtm[1].classList.remove('active');
    btm2.classList.remove('selected');
    btmUnic.classList.add('selected-bg');
  } else if (buttonClicked.classList.contains('btm-2')) {
    btmGroup.classList.add('selected-bg');
    efTrazBtm[0].classList.remove('active');
    efTrazBtm[1].classList.add('active');
    btm1.classList.remove('selected');
    btmUnic.classList.remove('selected-bg');
  }
}

