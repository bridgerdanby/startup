let loggedin = false;

function login() {
    let btn = document.querySelector("#loginbtn");
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
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

function authenticate(username, password, resolve, reject) {
  if(username !== "" && password !== "") {
    resolve("login successful");
  }
  else {
    reject("invalid username or password");
  }
}

function reset() {
  document.querySelector('#username').value = "";
  document.querySelector('#password').value = "";
}

/*  else {
    const logoutinator = new Promise((resolve, reject) => {
      if (Math.random() > 0.1) {
      resolve("Logged out");
    } else {
      reject('please try again');
    }
    })
    
    logoutinator.then((result) => {
        btn.className = "login";
        btn.textContent = "Login";
        console.log(result)
        } )
        .catch((err) => console.log(err))
  } */