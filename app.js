let board = [
    ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
    ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
    ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
];

let boardHTML = document.getElementById("board")
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
        boardHTML.rows[i].cells[j].setAttribute('id', board[i][j])
        if(boardHTML.rows[i].cells[j].id != ''){
            let img = document.createElement("img");
            img.src = `imgs/${boardHTML.rows[i].cells[j].id}.png`;
            boardHTML.rows[i].cells[j].appendChild(img);
        }
    }
}