let secretWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;
const maxAttempts = 6;
let currentGuess = "";
let gameOver = false;

const gameBoard = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const newGameButton = document.getElementById("new-game");

function createBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < maxAttempts; i++) {
        let row = document.createElement("div");
        row.classList.add("wordle-row");

        for (let j = 0; j < 5; j++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            row.appendChild(tile);
        }

        gameBoard.appendChild(row);
    }
}

function createKeyboard() {
    keyboard.innerHTML = "";

    const rows = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
    ];

    for (let row of rows) {
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let letter of row) {
            let button = document.createElement("button");
            button.textContent = letter;
            button.classList.add("key");

            if (letter === "ENTER") {
                button.classList.add("wide-key");
                button.addEventListener("click", checkGuess);
            } else if (letter === "⌫") {
                button.classList.add("wide-key");
                button.addEventListener("click", deleteLetter);
            } else {
                button.addEventListener("click", function() {
                    addLetter(letter);
                });
            }

            keyboardRow.appendChild(button);
        }

        keyboard.appendChild(keyboardRow);
    }
}

function addLetter(letter) {
    if (gameOver || currentGuess.length >= 5) {
        return;
    }

    currentGuess += letter;
    updateBoard();
}

function deleteLetter() {
    if (gameOver) {
        return;
    }

    currentGuess = currentGuess.slice(0, -1);
    updateBoard();
}

function updateBoard() {
    let row = gameBoard.children[attempts];

    for (let i = 0; i < 5; i++) {
        let tile = row.children[i];
        tile.textContent = currentGuess[i] || "";
    }
}

function checkGuess() {
    if (gameOver) {
        return;
    }

    if (currentGuess.length !== 5) {
        message.textContent = "Unesi riječ od 5 slova!";
        return;
    }

    if (!words.includes(currentGuess)) {
        message.textContent = "Riječ nije na popisu!";
        return;
    }

    let row = gameBoard.children[attempts];
    let remainingLetters = secretWord.split("");
    let colors = ["gray", "gray", "gray", "gray", "gray"];

    for (let i = 0; i < 5; i++) {
        if (currentGuess[i] === secretWord[i]) {
            colors[i] = "green";
            remainingLetters[i] = null;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (colors[i] === "gray") {
            let position = remainingLetters.indexOf(currentGuess[i]);

            if (position !== -1) {
                colors[i] = "yellow";
                remainingLetters[position] = null;
            }
        }
    }

    for (let i = 0; i < 5; i++) {
        row.children[i].classList.add(colors[i]);
    }

    attempts++;

    if (currentGuess === secretWord) {
        message.textContent = "Bravo! Pogodio si riječ!";
        gameOver = true;
        return;
    }

    if (attempts === maxAttempts) {
        message.textContent = "Izgubio si! Riječ je bila: " + secretWord;
        gameOver = true;
        return;
    }

    currentGuess = "";

    message.textContent = "Preostalo pokušaja: " +
                          (maxAttempts - attempts);
}

document.addEventListener("keydown", function(event) {
    if (gameOver) {
        return;
    }

    if (event.key === "Enter") {
        checkGuess();
    } else if (event.key === "Backspace") {
        deleteLetter();
    } else if (/^[a-zA-Z]$/.test(event.key)) {
        addLetter(event.key.toUpperCase());
    }
});

function newGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];

    attempts = 0;
    currentGuess = "";
    gameOver = false;

    message.textContent = "Pogodi riječ od 5 slova!";

    createBoard();
    createKeyboard();
}

newGame();

newGameButton.addEventListener("click", newGame);

const prijavljeniKorisnik = JSON.parse(
    sessionStorage.getItem("prijavljeniKorisnik")
);

const navPrijava = document.getElementById("nav-prijava");
const navRegistracija = document.getElementById("nav-registracija");
const navKorisnik = document.getElementById("nav-korisnik");
const navOdjava = document.getElementById("nav-odjava");
const korisnikIme = document.getElementById("korisnik-ime");

if (prijavljeniKorisnik) {
    navPrijava.classList.add("d-none");
    navRegistracija.classList.add("d-none");

    navKorisnik.classList.remove("d-none");
    navOdjava.classList.remove("d-none");

    korisnikIme.textContent = prijavljeniKorisnik.korisnickoIme;
}

const gumbOdjava = document.getElementById("gumb-odjava");

gumbOdjava.addEventListener("click", function(event) {
    event.preventDefault();

    sessionStorage.removeItem("prijavljeniKorisnik");

    window.location.href = "odjava.html";
});