let beviteliMezo = document.querySelector(".js-game-input");
let tippTarolo = document.querySelector(".js-guess-container");
let ujJatekGomb = document.querySelector(".js-new-game");
let hozzAdGomb = document.querySelector(".js-submit-guess");

let target;
let listOfGuesses = [];

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
    if (!isNaN(guessValue)) {
        validateGuess();
        compareGuessToTarget(guessValue)
        renderList(guessValue)
    };
}

function compareGuessToTarget(guess) {

    if (guess > target) {
        tippTarolo.innerHTML = `<div class="alert alert-info" role="alert">${guess} - A szám kisebb! </div>`
    } else if (guess < target) {
        tippTarolo.innerHTML = `<div class="alert alert-warning" role="alert">${guess} - A szám nagyobb! </div>`
    } else if (guess === target) {
        tippTarolo.innerHTML = `<div class="alert alert-success" role="alert">${guess} - Gratulálok!Eltaláltad </div>`
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
function renderList(guessValue) {
    html = ""
    listOfGuesses.unshift(guessValue);
    html += `<div> Az eddigi tippjeid: ${listOfGuesses}</div>`;
    tippTarolo.innerHTML += html;

}

function startGame() {
    target = generateNumber();
    resetGame();
}

startGame();
ujJatekGomb.addEventListener('click', startGame);
hozzAdGomb.addEventListener('click', submitGame);
beviteliMezo.addEventListener('change', validateGuess);
