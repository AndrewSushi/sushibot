let enPassant = false
let enPassantSquare = null
let whiteTurn = true

let castling = 15 // Binary representation of 0x1111 rooks 0xwL wR bL bR

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
    x = toX - fromX
    y = toY - fromY
    if(x == 0){
        let increment = y > 0 ? 1 : -1;
        for(let i = fromY + increment; i != toY; i += increment){
            if(board[fromX][i] != ''){
                return false;
            }
        }
    }else if(y == 0){
        let increment = x > 0 ? 1 : -1;
        for(let i = fromX + increment; i != toX; i += increment){
            if(board[i][fromY] != ''){
                return false
            }
        }
    }else if(Math.abs(x) == Math.abs(y)){
        let incrementY = y > 0 ? 1 : -1;
        let incrementX = x > 0 ? 1 : -1;
        for(let i = fromX + incrementX, j = fromY + incrementY; i != toX; i += incrementX, j += incrementY){
            if(board[i][j] != ''){
                return false
            }
        }
    }else{
        return false
    }
    return true
}

function rook(fromX, fromY, toX, toY, piece){
    move1 = (fromX == toX || fromY == toY)
    return move1 & isPathClear(fromX, fromY, toX, toY)
}

function knight(fromX, fromY, toX, toY){
    let move1 = (Math.abs(fromX - toX) === 2) && (Math.abs(fromY - toY) === 1)
    let move2 = (Math.abs(fromX - toX) === 1) && (Math.abs(fromY - toY) === 2)
    return move1 || move2
}

function bishop(fromX, fromY, toX, toY){
    move1 = (Math.abs(fromX - toX) == Math.abs(fromY - toY))
    return move1 & isPathClear(fromX, fromY, toX, toY)
}

function queen(fromX, fromY, toX, toY){
    move1 = (fromX == toX || fromY == toY)
    move2 = (Math.abs(fromX - toX) == Math.abs(fromY - toY))
    return (move1 || move2) & isPathClear(fromX, fromY, toX, toY)
}

function king(fromX, fromY, toX, toY, piece){
    if(piece[0] == 'w' && (castling >> 2 > 0)){
        if(Math.abs(fromY - toY) == 2){
            console.log("ASFHJKDHJKFASDHJIKFBk")
        }
    }
    move1 = (fromX == toX || fromY == toY)
    move2 = (Math.abs(fromX - toX) == Math.abs(fromY - toY))
    oneSquare = ((Math.abs(fromX - toX) == 1) || (Math.abs(fromX - toX) == 0)) && ((Math.abs(fromY - toY) == 1) || (Math.abs(fromY - toY) == 0))
    if((move1 || move2) && oneSquare){
        if(piece[0] == 'w'){
            castling = castling & 0b0011
        }else{
            castling = castling & 0b1100
        }
        return true
    }


    return false
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