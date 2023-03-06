const moveSound = document.getElementById("move")
const captureSound = document.getElementById("capture")
const checkSound = document.getElementById("check")

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

let rows = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h'
}

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
            if((i == 0) && (board[i][j] == 'wP')){
                board[i][j] = 'wQ'
            }else if((i == 7) && (board[i][j] == 'bP')){
                board[i][j] = 'bQ'
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
    if(whiteTurn && selectedSquare == null){
        if(board[x][y][0] == 'b'){
            return;
        }
    }else if(!whiteTurn && selectedSquare == null){
        if(board[x][y][0] == 'w'){
            return;
        }
    }
    if(board[x][y] !== '' && selectedSquare == null){
        selectedSquare = [x, y, piece];
        piece.style.backgroundColor = "rgb(130,151,105)"
        showValidSquares(x, y)
    }else if(selectedSquare && selectedSquare[0] === x && selectedSquare[1] === y){
        selectedSquare = null;
        piece.style.backgroundColor = '';
        removePotential();
    }else if(selectedSquare){
        movePiece(selectedSquare[0], selectedSquare[1], x, y);
        selectedSquare[2].style.backgroundColor = '';
        selectedSquare = null;
        removePotential();
    }
}

// Print board to the console
function printBoard(){
    for(let i = 0; i < 8; i++){
        console.log(board[i]);
    }
}

function representBoard(){
    boardString = ''
    empty = 0;
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board[i][j] != ''){
                if(empty != 0){
                    boardString += `${empty}`
                }
                empty = 0
                if(board[i][j][0] == 'b'){
                    boardString += board[i][j][1].toLowerCase()
                }else{
                    boardString += board[i][j][1]
                }
            }else{
                empty++
            }
        }
        if(empty != 0){
            boardString += `${empty}`
        }
        empty = 0
        if(i != 7){
            boardString += '/'
        }
    }
    if(whiteTurn){
        boardString += ' w '
    }else{
        boardString += ' b '
    }

    if(castling & 4){
        boardString += 'K'
    }
    if(castling & 8){
        boardString += 'Q'
    }
    if(castling & 1){
        boardString += 'k'
    }
    if(castling & 2){
        boardString += 'q'
    }
    if(castling == 0){
        boardString += '-'
    }
    
    boardString += ' '
    
    if(enPassantSquare){
        boardString += `${rows[enPassantSquare[0] - 1]}${enPassantSquare[1] - 1}`
    }else{
        boardString += '-'
    }
    boardString += ' '
    return boardString
}

renderBoard();
addEventListeners();
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