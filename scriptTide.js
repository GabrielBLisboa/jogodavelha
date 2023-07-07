const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "Tide";
let running = false;

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Jogada: ${currentPlayer}`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    if (currentPlayer == "Tide") {
    cells[index].innerHTML = '<img src = "images/TidePlayer.webp" widht="50" height="50">'   
    }
    else {
    cells[index].innerHTML = '<img src = "images/MimoPlayer.webp" widht="50" height="50">'   
    }
    
}

function changePlayer(){
    currentPlayer = (currentPlayer == "Tide") ? "Mimo" : "Tide";
    statusText.textContent = `Jogada: ${currentPlayer}`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} ganhou!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Empate`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "Tide";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Jogada: ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}