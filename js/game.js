let popup = document.getElementById('popup');

document.getElementById('popup-close').addEventListener(
    'click', () => { popup.style.display = 'none'; })

function showPopup(title, message) {
    popup.children[0].innerHTML = title;
    popup.children[1].innerHTML = message;
    popup.style.display = 'flex';
}

let board = document.getElementById('board');
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        let square = document.createElement('span');
        square.setAttribute('is-black', (j + i) % 2);
        square.addEventListener('click', () => { clicked(i, j) });
        board.appendChild(square);
    }
}

function randSquareIndex() {
    return Math.trunc(Math.random() * 64);
}

let squares = board.children;
var knight, target, knight_i, knight_j;
function newGame() {
    knight = randSquareIndex();
    target;
    do {
        target = randSquareIndex();
    }
    while (target === knight);
    putPieces();
}

var hintOn = false;
function hideHints() {
    if (hintOn) {
        hintOn = false;
        for (const i of legals) {
            squares[i].setAttribute('hint', 0);
        }
    }
}

function showHints() {
    hintOn = true;
    for (const i of legals) {
        squares[i].setAttribute('hint', 1);
    }
}

var legals;
function putPieces() {
    for (const square of squares) {
        square.setAttribute('has-knight', 0);
        square.setAttribute('is-target', 0)
        square.removeEventListener('mouseover', hideHints);
        square.removeEventListener('mouseover', showHints);
        square.addEventListener('mouseover', hideHints);
    }
    knight_i = Math.trunc(knight / 8);
    knight_j = knight % 8;
    squares[knight].setAttribute('has-knight', 1);
    squares[target].setAttribute('is-target', 1);

    legals = [];
    for (let i = 0; i < 64; i++)
        if (Math.abs((knight_i - Math.trunc(i / 8)) * (knight_j - i % 8)) == 2)
            legals.push(i);
    console.log(legals);

    squares[knight].addEventListener('mouseover', showHints);
}

var score = 0;
function clicked(i, j) {
    if (i == knight_i && j == knight_j) {
        showPopup("Alert", "You should not click the Knight.<br>Move mouse over the knight to get hints.");
    }
    else if (Math.abs((knight_i - i) * (knight_j - j)) == 2) {
        knight = i * 8 + j;
        putPieces();
        if (knight == target) {
            showPopup("Good Job", "The knight has reached the target.<br>Enjoy a new game!");
            newGame();
            document.getElementById('score').innerHTML = "Score: " + ++score;

        }
        showHints();
    } else {
        showPopup("Illegal Move", "The knight cannot go there.");
    }
}

newGame();
