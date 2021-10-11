var tbody = document.querySelector('table tbody');
var client = {};
var findCpf = false;

function register() {
  client.Name = document.querySelector('#name').value;
  client.Cpf = document.querySelector('#cpf').value;
  existsCpf(client.Cpf, client.Id);
  client.BirthDate = document.querySelector('#birthDate').value;

  client.Income = document.querySelector('#income').value;
  if (client.Name === '' || client.Name === null) {
    bootbox.alert("Preencha o campo Nome");
  } 
  else {
    if (!isValidCPF(client.Cpf)) {
      bootbox.alert("CPF inválido.");
    }
    else if(findCpf){
      bootbox.alert("CPF já cadastrado.");
    }
    else if(client.BirthDate === '' || client.BirthDate === null) {
      bootbox.alert("Preencha o campo Data de Nascimento.");
    }
    else if(client.Income < 0){
      bootbox.alert("Renda familiar inválida.");
    }
    else if(!validateDate(client.BirthDate)) {
      bootbox.alert("Data inválida");
    }
    else {
      if (client.Id === undefined || client.Id === 0) {
          saveClients('POST', 0, client);
      }
      else {
        saveClients('PUT', client.Id, client);
      }
    }
  }
  findCpf = false;
  loadClients();
}

function newClient() {
  var btnSave = document.querySelector('#btnSave');
  var title = document.querySelector('#title');

  document.querySelector('#name').value = '';
  document.querySelector('#cpf').value = '';
  document.querySelector('#birthDate').value = '';
  document.querySelector('#income').value = '';

  client = {};

  btnSave.textContent = 'Cadastrar';
  btnCancel.textContent = 'Limpar';
  title.textContent = "Cadastrar cliente";
}

function cancel() {
  var btnSave = document.querySelector('#btnSave');
  var title = document.querySelector('#title');

  document.querySelector('#name').value = '';
  document.querySelector('#cpf').value = '';
  document.querySelector('#birthDate').value = '';
  document.querySelector('#income').value = '';

  client = {};

  btnSave.textContent = 'Cadastrar';
  btnCancel.textContent = 'Limpar';
  title.textContent = "Cadastrar cliente";
}

function loadClients() {
  tbody.innerHTML = '';

  var xhr = new XMLHttpRequest();

  xhr.open('GET', `https://localhost:44312/api/client/GetAll`, true)
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var clients = JSON.parse(this.responseText);
        for (var index in clients) {
          insertLine(clients[index]);
        }
      }
      else if (this.status == 500) {
        var error = JSON.parse(this.responseText);
      }
    }
  }
  xhr.send();
}

function saveClients(method, id, body) {
  var xhr = new XMLHttpRequest();

  if (id === 0) {
    id = '';
  }

  xhr.open(method, `https://localhost:44312/api/client/${id}`, true);

  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(body));
}

loadClients();

function editClient(_client) {
  var btnSave = document.querySelector('#btnSave');
  var title = document.querySelector('#title');


  document.querySelector('#name').value = _client.Name;
  document.querySelector('#cpf').value = _client.Cpf;
  document.querySelector('#birthDate').value = _client.BirthDate;
  document.querySelector('#income').value = _client.Income;


  btnSave.textContent = 'Salvar';
  btnCancel.textContent = 'Cancelar';
  title.textContent = `Editar cliente: ${_client.Name}`;

  client = _client;
}

function deleteClient(id) {
  var xhr = new XMLHttpRequest();

  xhr.open('DELETE', `https://localhost:44312/api/client/Delete/${id}`, false);

  xhr.send();
}

function deleteAndLoad(client) {
  bootbox.confirm({
    message: `Tem certeza que deseja excluir ${client.Name}?`,
    buttons: {
      confirm: {
        label: 'Sim',
        className: 'btn-success'
      },
      cancel: {
        label: 'Não',
        className: 'btn-danger'
      }
    },
    callback: function (result) {
      if (result) {
        deleteClient(client.Id);
        loadClients();
      }
    }
  });
}

function insertLine(client) {
  var bgColor = verifyIncome(client.Income);
  var trow = `<tr>
  <td>${client.Name}</td>
  <td><span id="${bgColor}">R$ ${client.Income}</span></td>
  <td>
  <button class="btn btn-warning" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#modal" onclick='editClient(${JSON.stringify(client)})'>Editar</button> 
  <button class="btn btn-danger" data-bs-dismiss="modal" onclick='deleteAndLoad(${JSON.stringify(client)})'>Deletar</button>
  </td>
  </tr>   
  `
  tbody.innerHTML += trow;
}

function isValidCPF(cpf) {
  if (typeof cpf !== 'string') return false
  cpf = cpf.replace(/[^\d]+/g, '')
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
  cpf = cpf.split('')
  const validator = cpf
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    .map(el => +el)
  const toValidate = pop => cpf
    .filter((digit, index, array) => index < array.length - pop && digit)
    .map(el => +el)
  const rest = (count, pop) => (toValidate(pop)
    .reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11 % 10
  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1])
}
function existsCpf(cpf, id) {

  var xhr = new XMLHttpRequest();

  xhr.open('GET', `https://localhost:44312/api/client/GetAll`, true)
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var clients = JSON.parse(this.responseText);
        for (var index in clients) {
          if(clients[index].Cpf === cpf && clients[index].Cpf !== id){
            findCpf = true;
          }
        }
      }
      else if (this.status == 500) {
        var error = JSON.parse(this.responseText);
      }
    }
  }
  xhr.send();
}


function verifyIncome(income) {
  if (income <= 980) {
    return "danger";
  }
  if (income > 980 && income <= 2500) {
    return "warning"
  }
  if (income > 2500) {
    return "success"
  }
}

(() => {
  var statusLogin = document.querySelector('#statusLogin');
  if (sessionStorage.getItem('token') != null) {
    statusLogin.innerHTML =
      `
    <li class="nav-item">
    <a class="nav-link active me-3 mb-2 mb-md-0" aria-current="page" href="/pages/login.html" onclick=logout()>Sair</a>
    </li>
    `
  }
  else {
    `
    <li class="nav-item">
    <a class="nav-link active me-3 mb-2 mb-md-0" aria-current="page" href="/pages/login.html">Entrar</a>
    </li>
    `
    window.location.href = "login.html";
  }
})()

function logout() {
  sessionStorage.removeItem('token');
  window.location.href = "login.html";
}

function validateDate(date) {
  var birthDate = new Date(date);
  if(birthDate > new Date()){
    return false;
  }
  else {
    return true;
  }
}


