let beviteliMezo = document.querySelector(".js-game-input");
let tippTarolo = document.querySelector(".js-guess-container");
let ujJatekGomb = document.querySelector(".js-new-game");
let hozzAdGomb = document.querySelector(".js-submit-guess");

let target;
let listOfGuesses = [];
let gameover = true;

function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function resetGame() {
    listOfGuesses = [];
    tippTarolo.innerHTML = " ";
    beviteliMezo.value = "";
}

function submitGame(event) {
    event.preventDefault();
    let guessValue = Number.parseInt(beviteliMezo.value);
    validateGuess(guessValue);
    compareGuessToTarget(guessValue);
    renderList(guessValue);

}


function compareGuessToTarget(guess) {
    if (!isNaN(guess) && (guess > 1 && guess < 100)) {
        if (guess > target) {
            tippTarolo.innerHTML = `<div class="alert alert-info" role="alert">${guess} - Your guess is higher! </div>`

        } else if (guess < target) {
            tippTarolo.innerHTML = `<div class="alert alert-warning" role="alert">${guess} - Your guess is lower! </div>`

        } else if (guess === target) {
            tippTarolo.innerHTML = `
            <div class="alert alert-success" role="alert">${guess} - Congratulation! You've guessed out! </div>
            <div class="d-flex justify-content-center"><iframe src="https://giphy.com/embed/Wmtm6YfkV3qXZXunxC" width="200" height="200" frameBorder="0" class=""></iframe></div>
            `
        }
        else {
            addGuessValidation(guess);
        }
    }
};
function addGuessValidation() {
    beviteliMezo.classList.add("is-invalid")
}
function removeGuessValidation() {
    beviteliMezo.classList.remove("is-invalid")
}
function validateGuess() {
    let guessValue = Number.parseInt(beviteliMezo.value);
    beviteliMezo.value = guessValue;
    if (Number.isNaN(guessValue) || guessValue < 1 || guessValue > 100) {
        addGuessValidation();
        return false;
    } else {
        removeGuessValidation();
        return true;
    }
}
function renderList(guess) {
    if (!isNaN(guess) && (guess > 1 && guess < 100)) {
        html = ""
        listOfGuesses.unshift(guess);
        html += `<div> Your guesses: ${listOfGuesses}</div>`;
        tippTarolo.innerHTML += html;
    } else {
        html += `<div> Invalid number`;
    }
    beviteliMezo.value = "";
}

function startGame() {
    target = generateNumber();
    resetGame();
}

startGame();
ujJatekGomb.addEventListener('click', startGame);
hozzAdGomb.addEventListener('click', submitGame);
beviteliMezo.addEventListener('change', validateGuess);


