var numOfPlayers = 0;
var currentLv = 1;
var currentPlayerTurn = 1;
var currentPlayer;
var playerIsCorrect;
var gameIsActive = false;
var userCanInteract = false;
var players = [];
var colors = ["green", "red", "yellow", "blue"];
var randomColor;
var currentSequence = [];
var sequenceSpeed = 600;
var currentPlayerSequence = [];
var streakCounter = 0;
var counter = 0;

function Player(name, turn, score, isActive, bestStreak) {
    this.name = name;
    this.turn = turn;
    this.score = score;
    this.isActive = isActive;
    this.bestStreak = bestStreak;
}

function firstPlayer() {
    currentPlayerTurn = 1;
}

async function startSequence() {
    userCanInteract = false;
    randomColor = pickRandomColor();
    currentSequence.push(randomColor);

    for (var i = 0; i < currentSequence.length; i++) {
        await waitForSequenceSpeed();
        playAnimationOnButton(currentSequence[i]);
    }

    console.log(currentSequence);

    if (sequenceSpeed > 300) {
        sequenceSpeed -= 20;
    }

    console.log(sequenceSpeed);
    userCanInteract = true;
}

function addBtnToPlayerSequence(buttonClicked) {
    currentPlayerSequence.push(buttonClicked);
}

function checkPlayerInput() {
    if (currentPlayerSequence[counter - 1] === currentSequence[counter -1]){
        return true;
    } else {
        return false;
    }
}

function setNextPlayer() {
    currentPlayer = players[currentPlayer.turn];
}

function pickRandomColor() {
    var randomNumber = Math.floor(Math.random() * 4);
    colorPicked = colors[randomNumber];
    return colorPicked;
}

function addScore(){
    if (currentLv <= 5){
        currentPlayer.score += 10;
    } else if (currentLv > 5 && currentLv <= 10){
        currentPlayer.score += 20;
    } else if (currentLv > 10 && currentLv <= 15) {
        currentPlayer.score += 30;
    } else if (currentLv > 15){
        currentPlayer.score += 50;
    }
}

function checkWinner(){
    var winner;
    for (var i = 0; i < players.length; i++){
        if (i === 0){
            winner = players[i];
        } else {
            if (players[i].score > winner.score){
                winner = players[i];
            }
        }
    }
    return winner.name;
}

function resetGame() {
    currentLv = 1;
    currentSequence = [];
    currentPlayerSequence = [];
    sequenceSpeed = 600;
}

function resetAll() {
    currentLv = 1;
    numOfPlayers = 0;
    currentPlayerTurn = 1;
    gameIsActive = false;
    players = [];
    colors = ["green", "red", "yellow", "blue"];
    currentSequence = [];
    currentPlayerSequence = [];
    sequenceSpeed = 600;
}

function playAgainReset(){
    currentPlayer = players[0];
    for (var i = 0; i < players.length; i++) {
        players[i].score = 0;
        players[i].bestStreak = 0;
    }
    resetGame();
}

function waitForSequenceSpeed() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, sequenceSpeed);
    });
}

function startSequenceDelay() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 500);
    });
}
