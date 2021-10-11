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

function Generate() {
  var xhr = new XMLHttpRequest();
  var sum = 0;
  var peoples = 0;
  var richClients = 0;
  var classA = 0;
  var classB = 0;
  var classC = 0;


  xhr.open('GET', `https://localhost:44312/api/client/GetAll`, true)
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {

      if (this.status == 200) {
        var clients = JSON.parse(this.responseText);
        for (var index in clients) {
          var income = clients[index].Income;

          sum += income;

          if(income <= 980) 
            classA++;
          
          if(income > 980 && income <= 2500)
            classB++;
          
          if(income > 2500)
            classC++;
          
          peoples++;
        }

        insertClass(classA, classB, classC, peoples);
        for (var index in clients) {
          if(clients[index].Income > calculateAverage(sum, peoples)){
            var today = new Date();
            var birthDate = new Date(clients[index].BirthDate);
            if(age(birthDate, today) >= 18){
              richClients++;
            }
          }
        }
        insertClientsRichs(richClients);
      }
      else if (this.status == 500) {
        var error = JSON.parse(this.responseText);
      }
    }
  }
  xhr.send();
}

function calculateAverage(sum, total) {
  return sum / total;
}

function GenerateDay() {
  var xhr = new XMLHttpRequest();
  var sum = 0;
  var peoples = 0;
  var total = 0;
  var richClients = 0;
  var classA = 0;
  var classB = 0;
  var classC = 0;

  xhr.open('GET', `https://localhost:44312/api/client/GetAll`, true)
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {

      if (this.status == 200) {
        var clients = JSON.parse(this.responseText);
        for (var index in clients) {
          var income = clients[index].Income;
          peoples++;
          sum += income;
          var createAt = new Date(clients[index].CreateAt);
          if(differenceDay(new Date(), createAt)) {  
            if(income <= 980) 
              classA++;
            
            if(income > 980 && income <= 2500)
              classB++;
            
            if(income > 2500)
              classC++;

            total++;
          }
        }

        insertClass(classA, classB, classC, total);
        for (var index in clients) {
          if(clients[index].Income > calculateAverage(sum, peoples)){
            var today = new Date();
            var birthDate = new Date(clients[index].BirthDate);
            if(age(birthDate, today) >= 18){
              richClients++;
            }
          }
        }
        insertClientsRichs(richClients);
      }
      else if (this.status == 500) {
        var error = JSON.parse(this.responseText);
      }
    }
  }
  xhr.send();
}

function GenerateWeek() {
  var xhr = new XMLHttpRequest();
  var sum = 0;
  var peoples = 0;
  var total = 0;
  var richClients = 0;
  var classA = 0;
  var classB = 0;
  var classC = 0;

  xhr.open('GET', `https://localhost:44312/api/client/GetAll`, true)
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {

      if (this.status == 200) {
        var clients = JSON.parse(this.responseText);
        for (var index in clients) {
          var income = clients[index].Income;
          peoples++;
          sum += income;
          var createAt = new Date(clients[index].CreateAt);
          if(differenceWeek(new Date(), createAt)) {  
            if(income <= 980) 
              classA++;
            
            if(income > 980 && income <= 2500)
              classB++;
            
            if(income > 2500)
              classC++;

            total++;
          }
        }

        insertClass(classA, classB, classC, total);
        for (var index in clients) {
          if(clients[index].Income > calculateAverage(sum, peoples)){
            console.log(calculateAverage(sum, peoples));
            var today = new Date();
            var birthDate = new Date(clients[index].BirthDate);
            if(age(birthDate, today) >= 18){
              richClients++;
            }
          }
        }
        insertClientsRichs(richClients);
      }
      else if (this.status == 500) {
        var error = JSON.parse(this.responseText);
      }
    }
  }
  xhr.send();
}

function GenerateMonth() {
  var xhr = new XMLHttpRequest();
  var sum = 0;
  var peoples = 0;
  var total = 0;
  var richClients = 0;
  var classA = 0;
  var classB = 0;
  var classC = 0;

  xhr.open('GET', `https://localhost:44312/api/client/GetAll`, true)
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {

      if (this.status == 200) {
        var clients = JSON.parse(this.responseText);
        for (var index in clients) {
          var income = clients[index].Income;
          peoples++;
          sum += income;
          var createAt = new Date(clients[index].CreateAt);
          if(differenceMonth(new Date(), createAt)) {  
            if(income <= 980) 
              classA++;
            
            if(income > 980 && income <= 2500)
              classB++;
            
            if(income > 2500)
              classC++;

            total++;
          }
        }

        insertClass(classA, classB, classC, total);

        for (var index in clients) {
          if(clients[index].Income > calculateAverage(sum, peoples)){
            console.log(calculateAverage(sum, peoples));
            var today = new Date();
            var birthDate = new Date(clients[index].BirthDate);
            if(age(birthDate, today) >= 18){
              richClients++;
            }
          }
        }
        insertClientsRichs(richClients);
      }
      else if (this.status == 500) {
        var error = JSON.parse(this.responseText);
      }
    }
  }
  xhr.send();
}

function calculateAverage(sum, total) {
  return sum / total;
}

function insertClientsRichs(clientsIncome) {
  card = document.getElementById('card1');
  var h2 = `
           <h2 id="quantity" class="display-6 fw-bold">
            ${clientsIncome} clientes
           </h2>
          `
  if( card.innerHTML += h2 != NaN) {
    card.innerHTML = '';
  }
  card.innerHTML += h2;
}

function insertClass(classA, classB, classC, total) {
  var divA = document.getElementById('classA');
  var divB = document.getElementById('classB');
  var divC = document.getElementById('classC');
  var tot = document.getElementById('total');


  var pA = `<h3>${classA}</h3>`;
  var pB = `<h3>${classB}</h3>`;
  var pC = `<h3>${classC}</h3>`;
  var totalClients = `<h3>${total}</h3>`;

  if(divA.innerHTML += pA !== NaN) {
    divA.innerHTML = '';
    divB.innerHTML = '';
    divC.innerHTML = '';
    tot.innerHTML = '';
  }
  divA.innerHTML += pA;
  divB.innerHTML += pB;
  divC.innerHTML += pC;
  tot.innerHTML += totalClients;
}

function age(birthDate, today) {

  var differenceYear = today.getFullYear() - birthDate.getFullYear();
  if ( today.getFullYear(), today.getMonth(), today.getDate() < 
       today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
      differenceYear--;
  return differenceYear;
}

function differenceDay(today, date) {
  var dayActual = today.getDate();
  var day = date.getDate();
  var month = date.getMonth();
  var monthActual = today.getMonth();
  var difference = dayActual - day;
  console.log(difference);
  if(difference > 1) {
    return false;
  }
  else if(month !== monthActual) {
    return false;
  }
  else {
    return true;
  }
}

function differenceWeek(today, date) {
  var dayActual = today.getDate();
  var day = date.getDate();
  var month = date.getMonth();
  var monthActual = today.getMonth();
  var difference = dayActual - day;

  if(difference > 7) {
    return false;
  }

  if(month != monthActual) {
    return false;
  } 

  else {
    return true;
  }
}

function differenceMonth(today, date) {
  var dayActual = today.getDate();
  var day = date.getDate();
  var month = date.getMonth();
  var monthActual = today.getMonth();
  var difference = dayActual - day;

  if(difference > 30) {
    return false;
  }
  else if(monthActual - month > 1){
    return false;
  }
  else {
    return true;
  }
}