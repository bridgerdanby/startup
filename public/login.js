let loggedin = false;

function login() {
    const logininator = new Promise((resolve, reject) => {
      authenticate(`/api/auth/login`, resolve, reject);
    });
    logininator.then((result) => {
        success("Logging in")
    })
    .catch((err) => {
        failure("please try again")
    })
    .finally(() => reset());
}

function register() {
  const logininator = new Promise((resolve, reject) => {
    authenticate(`/api/auth/path`, resolve, reject);
  });
  logininator.then((result) => {
      success("registering");
  })
  .catch((err) => {
      failure("unable to register")
  })
  .finally(() => reset());
}

function success(message) {
  loginmsg = document.querySelector("#loginmsg");
  if (loginmsg.classList.contains('alert-danger')) {
      loginmsg.classList.remove('alert-danger');
  }
  loginmsg.classList.add('alert-success');
  loginmsg.textContent = message;
  localStorage.setItem("userName", username.value);
  document.location.href = "games.html";
}

function failure(message) {
  console.log(`Error: ${err}`);
  loginmsg = document.querySelector("#loginmsg");
  if (loginmsg.classList.contains('alert-success')) {
      loginmsg.classList.remove('alert-success');
  }
  loginmsg.classList.add('alert-danger');
  loginmsg.textContent = message;
}

async function authenticate(path, resolve, reject) {
  let btn = document.querySelector("#loginbtn");
  let userName = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;
  const response = await fetch(path, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const body = await response.json();

  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    window.location.href = 'games.html';
    resolve();
  }
  else {
    reject("invalid username or password");
  }
}

function reset() {
  document.querySelector('#username').value = "";
  document.querySelector('#password').value = "";
}

