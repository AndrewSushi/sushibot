let enPassant = false
let enPassantSquare = null
let whiteTurn = true

// Piece Moving
function movePiece(fromX, fromY, toX, toY){
    if(isValidMove(fromX, fromY, toX, toY)){
        board[toX][toY] = board[fromX][fromY];
        board[fromX][fromY] = ''
        renderBoard()
        renderBoard()
        whiteTurn = !whiteTurn
    }
}

function isPathClear(fromX, fromY, toX, toY){
    
}

function rook(fromX, fromY, toX, toY, piece){
    move1 = (fromX == toX || fromY == toY)
    return move1
}

function knight(fromX, fromY, toX, toY){
    let move1 = (Math.abs(fromX - toX) === 2) && (Math.abs(fromY - toY) === 1)
    let move2 = (Math.abs(fromX - toX) === 1) && (Math.abs(fromY - toY) === 2)
    return move1 || move2
}

function bishop(fromX, fromY, toX, toY){
    move1 = (Math.abs(fromX - toX) == Math.abs(fromY - toY))
    return move1
}

function queen(fromX, fromY, toX, toY){
    move1 = (fromX == toX || fromY == toY)
    move2 = (Math.abs(fromX - toX) == Math.abs(fromY - toY))
    return move1 || move2
}

function king(fromX, fromY, toX, toY){
    move1 = (fromX == toX || fromY == toY)
    move2 = (Math.abs(fromX - toX) == Math.abs(fromY - toY))
    oneSquare = ((Math.abs(fromX - toX) == 1) || (Math.abs(fromX - toX) == 0)) && ((Math.abs(fromY - toY) == 1) || (Math.abs(fromY - toY) == 0))
    return (move1 || move2) && oneSquare
}

function pawn(fromX, fromY, toX, toY, piece){
    if(piece[0] == 'w'){
        if(fromX - toX < 0){
            return false
        }
    }else{
        if(toX - fromX < 0){
            return false
        }
    }
    let normalPush = (Math.abs(toX - fromX) === 1 && toY === fromY && board[toX][toY] === '');
    let capture = (Math.abs(toX - fromX) === 1 && Math.abs(toY - fromY) === 1 && board[toX][toY] !== '');
    let twoPush = (Math.abs(toX - fromX) === 2 && ((fromX === 6) || (fromX === 1)) && toY === fromY && board[toX][toY] === '');
    if(enPassant && (toX == enPassantSquare[0]) && (toY == enPassantSquare[1])){
        if(piece[0] == 'w'){
            board[toX + 1][toY] = ''
        }else{
            board[toX - 1][toY] = ''
        }
        return true
    }
    if(twoPush){
        enPassant = true
        enPassantSquare = [(fromX + toX) / 2, fromY]
    }else{
        enPassant = false
        enPassantSquare = null
    }

    // TODO: Enpassant
    return normalPush || capture || twoPush;
}

// Validation checking
function isValidMove(fromX, fromY, toX, toY){
    let piece = board[fromX][fromY];
    if((piece[0] == 'b') && (whiteTurn)){
        return false
    }else if((piece[0] == 'w') && (!whiteTurn)){
        return false
    }
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
            enPassant = false
            return rook(fromX, fromY, toX, toY, piece)
        case 'N':
            enPassant = false
            return knight(fromX, fromY, toX, toY, piece)
        case 'B':
            enPassant = false
            return bishop(fromX, fromY, toX, toY, piece)
        case 'Q':
            enPassant = false
            return queen(fromX, fromY, toX, toY, piece)
        case 'K':
            enPassant = false
            return king(fromX, fromY, toX, toY, piece)
        case 'P':
            return pawn(fromX, fromY, toX, toY, piece)
    }
    // console.log(piece[1])
    return true
}