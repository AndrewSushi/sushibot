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

function rook(fromX, fromY, toX, toY, piece){
    return true
}

function knight(fromX, fromY, toX, toY){
    let move1 = (Math.abs(fromX - toX) === 2) && (Math.abs(fromY - toY) === 1)
    let move2 = (Math.abs(fromX - toX) === 1) && (Math.abs(fromY - toY) === 2)
    return move1 || move2
}

function bishop(fromX, fromY, toX, toY, piece){
    return true
    
}

function queen(fromX, fromY, toX, toY, piece){
    return true
    
}

function king(fromX, fromY, toX, toY, piece){
    return true

}

function pawn(fromX, fromY, toX, toY, piece){
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

// Validation checking
function isValidMove(fromX, fromY, toX, toY){
    let piece = board[fromX][fromY];
    if(fromX == toX & fromY == toY){
        console.log("Error1")
        return false
    }
    if(piece == board[toX][toY]){
        console.log("Error2")
        return false
    }
    if(piece[0] === board[toX][toY][0]){
        console.log("Error3")
        return false
    }
    switch(piece[1]){
        case 'R':
            return rook(fromX, fromY, toX, toY, piece)
        case 'N':
            return knight(fromX, fromY, toX, toY, piece)
        case 'B':
            return bishop(fromX, fromY, toX, toY, piece)
        case 'Q':
            return queen(fromX, fromY, toX, toY, piece)
        case 'K':
            return king(fromX, fromY, toX, toY, piece)
        case 'P':
            return pawn(fromX, fromY, toX, toY, piece)
    }
    // console.log(piece[1])
    return true
}