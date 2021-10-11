var login = function () {
  event.preventDefault();
  var email = document.querySelector('#email');
  var password = document.querySelector('#password')
  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://localhost:44312/token', true);
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  
  xhr.onload = function () {
    var result = JSON.parse(this.responseText);
    if(result.error != 'invalid_grant'){
      sessionStorage.setItem('token', `${result.token_type} ${result.access_token}`)
      verify();
    }
    else {
      window.alert(result.error_description);
      email.value = '';
      password.value = '';
    }

  }
  
  xhr.send(`grant_type=password&username=${email.value}&password=${password.value}`);
}

var verify = function () {
  var xhr = new XMLHttpRequest();
  
  xhr.open('GET', `https://localhost:44312/api/client/GetAll`, true)
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

  xhr.onreadystatechange = function () {
    var result = this.responseText;
    window.location.href = "index.html";
  }
  xhr.send();
}