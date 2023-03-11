let games = new Map();

games.set('0', { 
    name: "Simon says",
    id: '0',
    description: "Simon says is a great interactive game to encourage active listening and instruction following.\
        One person is choosen to be Simon. They stand in front of the group and give instructions. If Simon says " +
        "\"Simon says\" then everyone must do that action. If Simon does not say \"Simon says\" the group cannot do that " +
        "action. The first person to make a mistake becomes the next Simon.\
        Once you get the hang of it try speeding up the instructions or making them harder.",
    level: "Easy",
    time: "30 min"
})

games.set('1', { 
    name: "A pirate treasure hunt",
    id: '1',
    description: "Preparation: secretly choose a few locations in your house or neighborhood and hide a \
    treasure or clue. Create clues that go to each location. \
    Assemble your friends. Whoever created the map serves as the navigator. Without giving it away, the \
    navigator gives clues to their crew about where to look next. Journey from checkpoint to checkpoint \
    until you get to the buried treasure. Consider a larger treasure for the final. \
    To spice things up add your own epic music and sidequests to keep things interesting.",
    level: "Moderate",
    time: "1 hr"
})

games.set('2', { 
    name: "Signs",
    id: '2',
    description: "Gather in a circle. Each person selects their own unique sign or action. \
    They can include noise if they would like. One person is selected to be in the middle first. \
    They leave the room while the rest of the group decides on who will start with the sign.\
    When everyone is back together the game starts. The person in the middle's goal is the say \
    the name of the person who has the sign. group members can pass the sign by making the sign \
    of one of their friends. However, their friend must accept the sign by making their own sign. \
    Once they accept it they have the sign and can now pass it to someone else. Remember, don't \
    hold on the the sign too long and don't get caught!\
    More experienced players may consider signs that are subtle or exagerated. They may also play \
    at a quicker pace.",
    level: "Advanced",
    time: "45 min"
})


let saved = [];
    


//put in local storage
//do seperate file for fav
//load from storage

function loadGames() {
    let gameContainer = document.querySelector("#games");
    let i = 0;
    //console.log("hello")
    games.forEach((game) => {
        addGame(game, game.id, gameContainer, false);
    })
    console.log(games);

}

function loadSaved() {
    let username = localStorage.getItem('userName')
    saved = JSON.parse(localStorage.getItem(username + 'saved'));
    //console.log(saved);
    let gameContainer = document.querySelector("#favorites");
    //console.log("hello");
    console.log(saved);
    for (let i = 0; i < saved.length; i++) {
        //console.log(i);
        let game = games.get(saved[i]);
        console.log(game);
        addGame(game, game.id, gameContainer, true);
        //console.log(gameContainer);
    }
}

function save(gameId) {
    console.log(gameId);
    console.log(games);

    let username = localStorage.getItem('userName')
    saved = JSON.parse(localStorage.getItem(username + 'saved'));

    console.log("saved" + saved);
    console.log("has: " +games.has(gameId));
    console.log("index: " + saved.indexOf(gameId));
    let gameContainer = document.querySelector("#favorites");
    
    if (games.has(gameId) && saved.indexOf(gameId) === -1) {
        saved.push(gameId);
        console.log(saved);
        let game = games.get(saved[saved.indexOf(gameId)]);
        console.log(gameContainer);
        addGame(game, game.id, gameContainer, true);
        //console.log(saved);
        let username = localStorage.getItem('userName') + 'saved';
        localStorage.setItem(username, JSON.stringify(saved));
        //console.log("array: " + JSON.parse(localStorage.getItem(username)));
        let saveFeedback = document.getElementById("fdbk" + gameId);
        saveFeedback.textContent = "Saved!";
        saveFeedback.classList.add("alert-success");
        console.log("fb");
        setTimeout(function() {
            saveFeedback.classList.remove("alert-success");
            saveFeedback.textContent = "";
        }, 1000)
    }
}

function remove(gameId) {
    saved.pop(saved.indexOf(gameId));
    let container = document.querySelector("#favorites");
    let child = document.getElementById(gameId);
    console.log(child);
    container.removeChild(child);
}

function addGame(game, id, container, saved) {
    //console.log("hello");
    let g = document.createElement('div');
    let titlediv = document.createElement('div');
    let title = document.createElement('h4');
    let descriptionContainer = document.createElement('div');
    let gameDescription = document.createElement('div');
    let gameDescriptionHeader = document.createElement('h5');
    let div1 = document.createElement('div');
    let descriptionBody = document.createElement('div');
    let gameInfo = document.createElement('div');
    let levelText = document.createElement('p');
    let timeText = document.createElement('p');
    let btnContainer = document.createElement('div');
    let saveBtn = document.createElement('button');
    let saveFeedback = document.createElement('div');

    g.classList.add("game");
    g.id = id;
    
    titlediv.classList.add("game-title");
    title.textContent = game.name;

    gameDescriptionHeader.textContent = "Description:";

    descriptionBody.textContent = game.description;

    descriptionContainer.classList.add("game-description-container");

    levelText.textContent = "Level: " + game.level;
    timeText.textContent = "Est Time: " + game.time;

    //console.log(g)
    if (!saved) {
        //console.log("jello");
        saveBtn.onclick = () => save(id);
        //console.log("jello");
        saveBtn.textContent = "Save";
    } else {
        //console.log("here");
        saveBtn.textContent = "Remove";
        saveBtn.onclick = () => remove(id);
        //console.log("there");
    }
    saveBtn.id = "save" + id;
    saveBtn.type = "button";
    saveBtn.classList.add("btn-accent");
    saveFeedback.id = "fdbk" + id;
    saveFeedback.classList.add("alert");

    //btns
    btnContainer.appendChild(saveBtn);
    btnContainer.appendChild(saveFeedback);

    //game info
    gameInfo.appendChild(levelText);
    gameInfo.appendChild(timeText);

    div1.appendChild(descriptionBody);

    gameDescription.appendChild(gameDescriptionHeader);
    gameDescription.appendChild(div1);
    titlediv.appendChild(title);

    descriptionContainer.appendChild(gameDescription);
    descriptionContainer.appendChild(gameInfo);
    descriptionContainer.appendChild(btnContainer);

    g.appendChild(titlediv);
    g.appendChild(descriptionContainer);
    
    container.appendChild(g);
}