function load() {
    document.querySelector("#profilepicbtn").style.visibility = 'hidden';
}

function edit() {
    document.querySelector("#profilepicbtn").style.visibility = 'visible';
    document.querySelector("#full_name_input").removeAttribute('readonly');
    document.querySelector("#email_input").removeAttribute('readonly');
    let editbtn = document.querySelector("#editbtn");
    editbtn.textContent = "Save";
    editbtn.onclick = () => save();
}

function save() {
    console.log("save");
    //pic
    document.querySelector("#profilepicbtn").style.visibility = 'hidden';
    let name = document.querySelector("#full_name_input");
    let email = document.querySelector("#email_input");
    name.placeholder = name.textContent;
    email.placeholder = email.textContent;
    name.textContent = "";
    email.textContent = "";
    document.querySelector("#full_name_input").setAttribute('readonly', true);
    document.querySelector("#email_input").setAttribute('readonly', true);
    let editbtn = document.querySelector("#editbtn");
    editbtn.textContent = "Edit";
    editbtn.onclick = () => edit();
}

function displayQuote(data) {
    const containerEl = document.querySelector("#quote");
  
    const quoteEl = document.createElement("p");
    quoteEl.classList.add("quote");
    const authorEl = document.createElement("p");
    authorEl.classList.add("author");
  
    quoteEl.textContent = data.content;
    authorEl.textContent = data.author;
  
    containerEl.appendChild(quoteEl);
    containerEl.appendChild(authorEl);
}

function callService(url, displayCallback) {
fetch(url)
    .then((response) => response.json())
    .then((data) => {
    displayCallback(data);
    });
}

callService("https://api.quotable.io/random", displayQuote);