let loggedin = false;

`/api/auth/login`



function login() {
    const logininator = new Promise((resolve, reject) => {
      authenticate(username, password, resolve, reject);
    });
    logininator.then((result) => {
        loginmsg = document.querySelector("#loginmsg");
        if (loginmsg.classList.contains('alert-danger')) {
            loginmsg.classList.remove('alert-danger');
        }
        loginmsg.classList.add('alert-success');
        loginmsg.textContent = "loginSucessful";
        localStorage.setItem("userName", username.value);
        console.log("logging in")
        //take to home
        document.location.href = "games.html";
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
        loginmsg = document.querySelector("#loginmsg");
        if (loginmsg.classList.contains('alert-success')) {
            loginmsg.classList.remove('alert-success');
        }
        loginmsg.classList.add('alert-danger');
        loginmsg.textContent = "please try again";
    })
    .finally(() => reset());
}

function register() {
  const logininator = new Promise((resolve, reject) => {
    authenticate(username, password, resolve, reject);
  });
  logininator.then((result) => {
      loginmsg = document.querySelector("#loginmsg");
      if (loginmsg.classList.contains('alert-danger')) {
          loginmsg.classList.remove('alert-danger');
      }
      loginmsg.classList.add('alert-success');
      loginmsg.textContent = "loginSucessful";
      localStorage.setItem("userName", username.value);
      console.log("logging in")
      //take to home
      document.location.href = "games.html";
  })
  .catch((err) => {
      console.log(`Error: ${err}`);
      loginmsg = document.querySelector("#loginmsg");
      if (loginmsg.classList.contains('alert-success')) {
          loginmsg.classList.remove('alert-success');
      }
      loginmsg.classList.add('alert-danger');
      loginmsg.textContent = "please try again";
  })
  .finally(() => reset());

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

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#userName')?.value;
  const password = document.querySelector('#userPassword')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const body = await response.json();

  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    window.location.href = 'play.html';
  } else {
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}