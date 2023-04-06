class Websocket {
    socket;
    constructor() {    
        this.configureWebSocket();
    }

    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
          //this.displayMsg('system', 'game', 'connected');
          console.log("connected");
        };
        this.socket.onclose = (event) => {
          //this.displayMsg('system', 'game', 'disconnected');
          console.log("disconnected");
        };
        this.socket.onmessage = async (event) => {
          const msg = JSON.parse(await event.data.text());
          console.log("incomming");
          this.displayMsg('player', msg.from, `Added a new game`);
        };
      }
    
      displayMsg(cls, from, msg) {
        const chatText = document.querySelector('#player-messages');
        console.log(chatText);
        chatText.textContent = msg;
      }
    
      broadcastEvent(from, type, value) {
        const event = {
          from: from,
          type: type,
          value: value,
        };
        this.socket.send(JSON.stringify(event));
      }
}


let websocket = new Websocket();

async function addGame() {

    let game = parseGame();

    console.log(game);

    response = await fetch(`/api/game`, {
        method: 'post',
        body: JSON.stringify({ name: game.name,
        description: game.description,
        time: game.time,
        level: game.level
     }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response?.status === 200) {
        // Let other people know a new game has been added
        websocket.broadcastEvent(localStorage.getItem('userName'), "gameadded", {});
      }
      else {
        console.log("add failed");
      }
}

function parseGame() {
    let game = { name: "",
            description: "",
            time: "",
            level: ""
    };

    let name = document.querySelector("#game_name");
    let addgamemsg = document.querySelector("#addgamemsg");
    console.log(name.value);
    game.name = name.value;
    if(game.name === "") {
        addgamemsg.classList.add('alert-danger');
        addgamemsg.textContent = "Please enter a name";
        return;
    }

    let description = document.querySelector("#game_description_input");
    console.log(description.value);
    game.description = description.value;
    if(game.description === "") {
        addgamemsg.classList.add('alert-danger');
        addgamemsg.textContent = "Please enter a description";
        return;
    }

    let time1 = document.querySelector("#time1");
    console.log(time1.checked);
    if(time1.checked) {
        game.time = "30 min"
    }
    let time2 = document.querySelector("#time2");
    console.log(time2.checked);
    if(time2.checked) {
        game.time = "45 min"
    }
    let time3 = document.querySelector("#time3");
    console.log(time3.checked);
    if(time3.checked) {
        game.time = "1 hr"
    }
    let time4 = document.querySelector("#time4");
    console.log(time4.checked);
    if(time4.checked) {
        game.time = "2+ hr"
    }



    if(game.time === "") {
        addgamemsg.classList.add('alert-danger');
        addgamemsg.textContent = "Please select a time";
        return;
    }

    let level1 = document.querySelector("#easyradio");
    console.log(level1.checked);
    if(level1.checked) {
        game.level = "Easy"
    }
    let level2 = document.querySelector("#moderateradio");
    console.log(level2.checked);
    if(level2.checked) {
        game.level = "Moderate"
    }
    let level3 = document.querySelector("#advancedradio");
    console.log(level3.checked);
    if(level3.checked) {
        game.level = "Advanced"
    }

    if(game.level === "") {
        addgamemsg.classList.add('alert-danger');
        addgamemsg.textContent = "Please select a level";
        return;
    }

    if (addgamemsg.classList.contains('alert-danger')) {
        addgamemsg.classList.remove('alert-danger');
        addgamemsg.textContent = "";
    }

    return game;
}

// Functionality for peer communication using WebSocket

