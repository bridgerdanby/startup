let games = new Map();

games.set(1, { 
    name: "Simon says",
    description: "Simon says is a great interactive game to encourage active listening and instruction following." + "\n" +
        "One person is choosen to be Simon. They stand in front of the group and give instructions. If Simon says" +
        "\"Simon says\" then everyone must do that action. If Simon does not say \"Simon says\" the group cannot do that " +
        "action. The first person to make a mistake becomes the next Simon." + "\n" +
        "Once you get the hang of it try speeding up the instructions or making them harder.",
    level: "Easy",
    time: "30 min"
})

let saved = new Map();
    


//put in local storage
//do seperate file for fav
//load from storage

document.addEventListener("DOMContentLoaded", loadGames);

function loadGames() {
    let gameContainer = document.querySelector("#games");
    let i = 0;
    for(const game in games) {
        console.log(i);
        addGame(game, i, gameContainer, false);
        console.log(gameContainer);
    }
}

function save(gameId) {
    console.log(gameId);
    if (!games.has(gameId)) {
        game = games.get(gameId);
        favs = document.querySelector("#favorites");
        addGame(game, game.id, favs, true);
    }
}

function remove(gameId) {

}

function addGame(game, id, container, saved) {
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
    let playBtn = document.createElement('button');

    g.class = game;
    g.id = id;
    
    titlediv.classList.add("game-title");
    title.textContent = game.name;

    gameDescriptionHeader.textContent = "Description:";

    descriptionBody.textContent = game.description;

    levelText.textContent = "Level: " + game.level;
    timeText.textContent = "Est Time: " + game.time;

    if (!saved) {
        console.log("jello");
        saveBtn.setEventListener("onclick", save(game.id));
        console.log("jello");
        saveBtn.textContent = "Save";
    } else {
        saveBtn.textContent = "Remove";
        saveBtn.addEventListener("onclick", remove())
    }
    saveBtn.id = "save";
    saveBtn.type = "button";
    saveBtn.classList.add("btn-accent");

    playBtn.type = "button";
    playBtn.classList.add("btn-accent");
    //onclick
    playBtn.textContent = "Play Now"

    //btns
    btnContainer.appendChild(saveBtn);
    btnContainer.appendChild(playBtn);

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