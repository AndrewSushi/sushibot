function isCheck(kingPos){
    kingColor = board[kingPos[0]][kingPos[1]]
    kingHTML = boardHTML.rows[kingPos[0]].cells[kingPos[1]]
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board[i][j] != ""){
                if(isValidMove(i, j, kingPos[0], kingPos[1])){
                    checkSound.play()
                    kingHTML.classList.add("check")
                }
            }
        }
    }
}