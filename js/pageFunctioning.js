var title = $("#level-title");
var startGameBtn = $("#start-game-btn");
var howToPlayBtn = $("#how-to-play-btn");
var gameDescription = $("#game-description");
var playerNameTextArea = $("#player-name-textbox");
var submitPlayerNameBtn = $("#submit-player-name-btn");
var readyBtn = $("#ready-btn");
var backToMainMenuBtn = $("#back-to-main-menu-btn");
var backToPreviousPlayerBtn = $("#back-to-previous-player-btn");
var quitGameBtn = $("#quit-game-btn");
var playAgainBtn = $("#play-again-btn");
var playersResults = $("#results-container");
var colorButtons = $(".btn");

//*********************MENU FUNCTIONING*********************//

//How to Play Button...
howToPlayBtn.on("click", function () {
    playConfirmSound();

    hideMainMenu();
    showHowToPlayMenu();
});

//Start Game Button...
startGameBtn.on("click", function () {
    playConfirmSound();

    changeTitleSizeToMd();
    hideMainMenu();
    showNumOfPlayersMenu();
});

//Back to Main Menu Button...
backToMainMenuBtn.on("click", function () {
    playGoBackSound();
    changeTitleSizeToLg();
    showMainMenu();
    hideHowToPlayMenu();
    hideNumOfPlayersMenu();
});

//Number of Players Buttons...
$(".player-btn").on("click", function () {
    playConfirmSound();
    btnPressedID = this.id;
    numOfPlayers = parseInt(btnPressedID.slice(0, 1));
    console.log(numOfPlayers + " players selected.");

    hideNumOfPlayersMenu();
    showPlayerNameSubmitMenu();
    playerNameTextArea.val("");
})

//Submit Player Name Button...

$(function() {
    playerNameTextArea.on('keypress', function(e) {
        if (e.which == 32){
            console.log('Space Detected');
            return false;
        }
    });
});

playerNameTextArea.on("keypress", function (event) {
    if (event.key === "Enter") {
        submitPlayerNameBtn.click();
    }
});

submitPlayerNameBtn.on("click", function () {
    if (checkForInvalidName(playerNameTextArea.val()) === false) {
        playConfirmSound();
        submitPlayerName();
        currentPlayer = players[0];
    }
});

//Back to Previous Player Button...

backToPreviousPlayerBtn.on("click", function () {

    playGoBackSound();

    if (currentPlayerTurn === 1) {
        hidePlayerNameSubmitMenu();
        showNumOfPlayersMenu();
    } else {
        currentPlayerTurn--;
        playerNameTextArea.val(players[currentPlayerTurn - 1].name);
        players.pop();
        title.text("Player " + currentPlayerTurn + ", enter your name:");
    }

    console.log(players);
})

//Ready Button

readyBtn.on("click", function () {
    resetGame();
    playConfirmSound();

    title.text("Level " + currentLv);
    changeTitleMarginToMd();

    readyBtn.addClass("hidden");
    currentPlayer.isActive = true;
    gameIsActive = true;
    showGameScreen();
    startSequence();
});

//Quit Game Button

quitGameBtn.on("click", function () {
    clearUI();
    resetAll();
    playGoBackSound();

    changeTitleSizeToLg();
    changeTitleMarginToLg();

    hideGameScreenToMainMenu();
    hideResultsScreen();
    showMainMenu();
})

//Play Again Button

playAgainBtn.on("click", function () {
    playConfirmSound();
    hideResultsScreen();
    playAgainReset();
    refreshUI();
    showFirstPlayerReadyScreen();
})

//*********************MUSIC*********************//

var bgm = new Audio("sounds/bgm.mp3");
var volMuteBtn = $(".volume-button");

bgm.volume = 0.3
bgm.loop = true;
bgm.play();

volMuteBtn.on("click", function (event) {
    if (volMuteBtn.html() === '<i class="fa fa-volume-up"></i>') {
        volMuteBtn.html('<i class="fa fa-volume-mute"></i>');
        bgm.muted = true;
    } else {
        volMuteBtn.html('<i class="fa fa-volume-up"></i>');
        bgm.muted = false;
    }
});

//*********************GAME BUTTONS*********************//

//Play sound and animation on click for each button...
$(".btn").on("click", function () {

    if (userCanInteract === true) {
        var btnId = this.id;

        addClassPressed(btnId);

        switch (btnId) {

            case "green":
                runBtnBehaviour(btnId);
                if (playerIsCorrect === true) {
                    playGreenBtnSound();
                } else if (playerIsCorrect === false) {
                    playInvalidNameSound();
                }
                break;

            case "red":
                runBtnBehaviour(btnId);
                if (playerIsCorrect === true) {
                    playRedBtnSound();
                } else if (playerIsCorrect === false) {
                    playInvalidNameSound();
                }
                break;

            case "yellow":
                runBtnBehaviour(btnId);
                if (playerIsCorrect === true) {
                    playYellowBtnSound();
                } else if (playerIsCorrect === false) {
                    playInvalidNameSound();
                }
                break;

            case "blue":
                runBtnBehaviour(btnId);
                if (playerIsCorrect === true) {
                    playBlueBtnSound();
                } else if (playerIsCorrect === false) {
                    playInvalidNameSound();
                }
                break;

            default:
                console.log(btnId);
        }
    }
});

//*********************FUNCTIONS*********************//

function showMainMenu() {
    title.text("Simon Game");
    startGameBtn.removeClass("hidden");
    howToPlayBtn.removeClass("hidden");
}

function hideMainMenu() {
    startGameBtn.addClass("hidden");
    howToPlayBtn.addClass("hidden");
}


function showHowToPlayMenu() {
    title.text("How to Play");
    gameDescription.removeClass("hidden");
    backToMainMenuBtn.removeClass("hidden");
}

function hideHowToPlayMenu() {
    gameDescription.addClass("hidden");
    backToMainMenuBtn.addClass("hidden");
}

function showNumOfPlayersMenu() {
    title.text("Select Number of Players");
    $(".player-btn").removeClass("hidden");
    backToMainMenuBtn.removeClass("hidden");
}

function hideNumOfPlayersMenu() {
    $(".player-btn").addClass("hidden");
    backToMainMenuBtn.addClass("hidden");
}

function changeTitleSizeToLg() {
    title.removeClass("title-size-md");
    title.addClass("title-size-lg");
}

function changeTitleSizeToMd() {
    title.removeClass("title-size-lg");
    title.addClass("title-size-md");
}

function changeTitleMarginToLg() {
    title.removeClass("title-margin-md");
    title.addClass("title-margin-lg");
}

function changeTitleMarginToMd() {
    title.removeClass("title-margin-lg");
    title.addClass("title-margin-md");
}

function showPlayerNameSubmitMenu() {
    backToPreviousPlayerBtn.removeClass("hidden");
    $(".form").removeClass("hidden");

    if (currentPlayerTurn <= numOfPlayers) {
        title.text("Player " + currentPlayerTurn + ", enter your name:");
    }
}

function hidePlayerNameSubmitMenu() {
    backToPreviousPlayerBtn.addClass("hidden");
    $(".form").addClass("hidden");
}

function showGameScreen() {
    colorButtons.removeClass("hidden");
    quitGameBtn.removeClass("hidden");
    playersResults.removeClass("hidden");
    $("#players-container").removeClass("hidden");
    $("#scores-container").removeClass("hidden");
}

async function hideGameScreen() {
    await waitForSequenceSpeed();
    colorButtons.addClass("hidden");
    quitGameBtn.addClass("hidden");
    playersResults.addClass("hidden");
    $("#players-container").addClass("hidden");
    $("#scores-container").addClass("hidden");
}

function hideGameScreenToMainMenu() {
    colorButtons.addClass("hidden");
    quitGameBtn.addClass("hidden");
    playersResults.addClass("hidden");
    $("#players-container").addClass("hidden");
    $("#scores-container").addClass("hidden");
}

async function showResultsScreen() {
    await waitForSequenceSpeed();
    title.text(checkWinner() + " Wins!!");
    playersResults.removeClass("hidden");
    playersResults.removeClass("results-bottom-left");
    playersResults.addClass("results-center");
    $("#players-container").removeClass("hidden");
    $("#scores-container").removeClass("hidden");
    $("#streaks-container").removeClass("hidden");
    quitGameBtn.removeClass("hidden");
    playAgainBtn.removeClass("hidden");
    quitGameBtn.removeClass("quit-game-btn-top-left");
    quitGameBtn.addClass("quit-game-btn-center");
}

function hideResultsScreen() {
    playersResults.addClass("hidden");
    playersResults.removeClass("results-center");
    playersResults.addClass("results-bottom-left");
    $("#players-container").addClass("hidden");
    $("#scores-container").addClass("hidden");
    $("#streaks-container").addClass("hidden");
    quitGameBtn.addClass("hidden");
    playAgainBtn.addClass("hidden");
    quitGameBtn.removeClass("quit-game-btn-center");
    quitGameBtn.addClass("quit-game-btn-top-left");
}

async function showNextPlayerReadyScreen() {
    await waitForSequenceSpeed();
    changeTitleMarginToLg();
    hideGameScreen();
    title.text(currentPlayer.name + ", it's your turn");
    readyBtn.removeClass("hidden");
}

function showFirstPlayerReadyScreen() {
    changeTitleMarginToLg();
    hideGameScreen();
    title.text(currentPlayer.name + ", it's your turn");
    readyBtn.removeClass("hidden");
}

function hideNextPlayerReadyScreen() {
    console.log("Hide Next Player Ready Screen");
}

function submitPlayerName() {

    switch (currentPlayerTurn) {
        case 1:
            var player1 = new Player(playerNameTextArea.val(), currentPlayerTurn, 0, false, 0);
            $("#p1-name-text").text(playerNameTextArea.val());
            $("#p1-score-text").text(player1.score);
            console.log(player1);
            players.push(player1);
            break;

        case 2:
            var player2 = new Player(playerNameTextArea.val(), currentPlayerTurn, 0, false, 0);
            $("#p2-name-text").text(playerNameTextArea.val());
            $("#p2-score-text").text(player2.score);
            console.log(player2);
            players.push(player2);
            break;

        case 3:
            var player3 = new Player(playerNameTextArea.val(), currentPlayerTurn, 0, false, 0);
            $("#p3-name-text").text(playerNameTextArea.val());
            $("#p3-score-text").text(player3.score);
            console.log(player3);
            players.push(player3);
            break;

        case 4:
            var player4 = new Player(playerNameTextArea.val(), currentPlayerTurn, 0, false, 0);
            $("#p4-name-text").text(playerNameTextArea.val());
            $("#p4-score-text").text(player4.score);
            console.log(player4);
            players.push(player4);
            break;
    }

    if (currentPlayerTurn < numOfPlayers) {
        currentPlayerTurn++;
        title.text("Player " + currentPlayerTurn + ", enter your name:");
    } else {
        $(".form").addClass("hidden");
        backToPreviousPlayerBtn.addClass("hidden");
        firstPlayer();
        title.text(players[currentPlayerTurn - 1].name + ", it's your turn");
        readyBtn.removeClass("hidden");
        console.log("gameIsActive: " + gameIsActive);
        console.log(players);
    }
    ;

    playerNameTextArea.val("");
}

function checkForInvalidName(text) {
    if (text === "") {
        title.text("Player " + currentPlayerTurn + ", please enter a valid name");
        playInvalidNameSound();
        return true;
    } else {
        return false;
    }
}

function addClassPressed(btnId) {
    $("#" + btnId).addClass("pressed", 200);
    setTimeout(function () {
        $("#" + btnId).removeClass("pressed", 200);
    }, 200);
}

//*********************GAME LOGIC UI*********************//

function playAnimationOnButton(button) {
    var btnId = button;

    addClassPressed(btnId);

    switch (btnId) {

        case "green":
            playGreenBtnSound();
            break;

        case "red":
            playRedBtnSound();
            break;

        case "yellow":
            playYellowBtnSound();
            break;

        case "blue":
            playBlueBtnSound();
            break;

        default:
            console.log(btnId);
    }
}

function runBtnBehaviour(btnId) {

    addBtnToPlayerSequence(btnId);

    counter++;

    if (checkPlayerInput() === true) {
        playerIsCorrect = true;

        if (counter === currentSequence.length) {
            setBackgroundColorToGreen();
            currentPlayer.bestStreak++;
            console.log(currentPlayer.bestStreak);
            counter = 0;
            addScore();
            currentLv++;
            refreshUI();
            currentPlayerSequence = [];
            startSequence();
        }
    } else if (checkPlayerInput() === false) {

        playerIsCorrect = false;
        setBackgroundColorToRed();
        refreshUI();
        resetGame();
        counter = 0;

        if (currentPlayer.turn < numOfPlayers) {
            hideGameScreen();
            showNextPlayerReadyScreen();
            setNextPlayer();
        } else if (currentPlayer.turn === numOfPlayers) {
            gameIsActive = false;
            hideGameScreen();
            showResultsScreen();
        }
    }
}

function setBackgroundColorToGreen() {
    $("body").addClass("correct-answer");
    setTimeout(function () {
        $("body").removeClass("correct-answer");
    }, 200)
}

function setBackgroundColorToRed() {
    $("body").addClass("wrong-answer");
    setTimeout(function () {
        $("body").removeClass("wrong-answer");
    }, 200)
}

function refreshUI() {

    for (var i = 0; i < players.length; i++) {
        $("#p" + (i + 1) + "-score-text").text(players[i].score);
        $("#p" + (i + 1) + "-streak-text").text(players[i].bestStreak);
    }

    if (gameIsActive === true) {
        if (playerIsCorrect === true) {
            title.text("Level " + currentLv);
        } else if (playerIsCorrect === false) {
            title.text("Game Over");
        }
    }

    // $("#p" + currentPlayer.turn + "-score-text").text(currentPlayer.score);
    // $("#p" + currentPlayer.turn + "-streak-text").text(currentPlayer.bestStreak);

}

function clearUI() {

    for (i = 1; i <= numOfPlayers; i++) {
        $("#p" + i + "-name-text").text("");
        $("#p" + i + "-score-text").text("");
    }

}

//*********************SOUNDS*********************//

//Game Buttons Sounds

function playGreenBtnSound() {
    var greenBtnSound = new Audio("sounds/green.mp3");
    greenBtnSound.volume = 0.2
    greenBtnSound.play();
}

function playRedBtnSound() {
    var redBtnSound = new Audio("sounds/red.mp3");
    redBtnSound.volume = 0.2;
    redBtnSound.play();
}

function playYellowBtnSound() {
    var yellowBtnSound = new Audio("sounds/yellow.mp3");
    yellowBtnSound.volume = 0.2;
    yellowBtnSound.play();
}

function playBlueBtnSound() {
    var blueBtnSound = new Audio("sounds/blue.mp3");
    blueBtnSound.volume = 0.2;
    blueBtnSound.play();
}

//Menu Buttons Sounds

function playConfirmSound() {
    var confirmSound = new Audio("sounds/red.mp3");
    confirmSound.volume = 0.2;
    confirmSound.play();
}

function playGoBackSound() {
    var goBackSound = new Audio("sounds/yellow.mp3");
    goBackSound.volume = 0.2;
    goBackSound.play();
}

function playInvalidNameSound() {
    var invalidNameSound = new Audio("sounds/wrong.mp3");
    invalidNameSound.volume = 0.2;
    invalidNameSound.play();
}
