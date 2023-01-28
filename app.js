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
        }
    }
}


function addEventListeners(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            boardHTML.rows[i].cells[j].addEventListener("click", function(event){
                let target1 = event.target
                while(!(target1.classList.contains("square"))){
                    target1 = target1.parentElement
                }
                // console.log(target1)
                handleClick(target1)
            })
        }
    }
}

let selectedSquare = null;
        
function handleClick(piece){
    let x = piece.parentNode.rowIndex
    let y = piece.cellIndex
    if(board[x][y] !== '' && selectedSquare == null){
        selectedSquare = [x, y, piece];
        piece.style.backgroundColor = "green"
    }else if(selectedSquare && selectedSquare[0] === x && selectedSquare[1] === y){
        selectedSquare = null;
        piece.style.backgroundColor = ''
    }else if(selectedSquare){
        movePiece(selectedSquare[0], selectedSquare[1], x, y)
        selectedSquare[2].style.backgroundColor = ''
        selectedSquare = null
        // console.log(piece)
        // Check to see if it is a valid move, if so, move
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

function isPathClear(fromX, fromY, toX, toY){

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
            if(piece[0] == 'w'){
                if(fromX - toX < 0){
                    return false
                }
            }else if(piece[0] == 'b'){
                if(toX - fromX < 0){
                    return false
                }
            }
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
addEventListeners()
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