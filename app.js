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

function renderBoard(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            boardHTML.rows[i].cells[j].setAttribute('id', board[i][j])
            boardHTML.rows[i].cells[j].innerHTML = "";
            if(board[i][j] !== ''){
                let img = document.createElement("img");
                img.src = `imgs/${boardHTML.rows[i].cells[j].id}.png`;
                boardHTML.rows[i].cells[j].appendChild(img);
            }
            boardHTML.rows[i].cells[j].addEventListener("click", function(event){
                let target1 = event.target
                // TODO: Recurse backwards to find parent node
                console.log(event.target)
            })
        }
    }
}

// Print board to the console
function printBoard(){
    for(let i = 0; i < 8; i++){
        console.log(board[i]);
    }
}

// Piece Moving
function movePiece(fromX, fromY, toX, toY){
    if(isValidMove(fromX, fromY, toX, toY)){
        board[toX][toY] = board[fromX][fromY];
        board[fromX][fromY] = ''
        renderBoard()
    }
}

// Validation checking
function isValidMove(fromX, fromY, toX, toY){
    let piece = board[fromX][fromY];
    if(fromX == toX & toX == toY){
        return false
    }
    if(piece == board[toX][toY]){
        return false
    }
    if(piece[0] === board[toX][toY][0]){
        return false
    }

    switch(piece[1]){
        case 'P':
            let normalPush = (Math.abs(toX - fromX) === 1 && toY === fromY && board[toX][toY] === '');
            let capture = (Math.abs(toX - fromX) === 1 && Math.abs(toY - fromY) === 1 && board[toX][toY] !== '');
            let twoPush = (Math.abs(toX - fromX) === 2 && ((fromX === 6) || (fromX === 1)) && toY === fromY && board[toX][toY] === '');
            let enPassant;
            // TODO: Enpassant
            return normalPush || capture || twoPush;
    }
    // console.log(piece[1])
    return true
}




renderBoard()
// movePiece(6, 4, 4, 4)
// movePiece(4, 4, 3, 4)
// // movePiece(4, 0, 3, 0)
// movePiece(1, 5, 3, 5)
// movePiece(3, 4, 2, 5)
// movePiece(0, 0, 5, 5)
// movePiece(6, 4, 5, 5)
// movePiece(5, 5, 4, 5)
// movePiece(0, 1, 5, 6)
// movePiece(1, 1, 3, 1)
// isValidMove(0, 0, 5, 5)
// isValidMove(0, 1, 5, 6)
// isValidMove(1, 1, 3, 1)
// isValidMove(0, 4, 1, 5)
// isValidMove(1, 5, 2, 5)