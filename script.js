let board = document.getElementById('board');
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        let square = document.createElement('span');
        square.setAttribute('row', i);
        square.setAttribute('col', j);
        square.setAttribute('is-black', (j + i) % 2);
        board.appendChild(square);
    }
}