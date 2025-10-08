function createBoard() {
let board = {
  array: ["", "", "", "", "", "", "", "", ""]
}
return {board}
}

function player (name, marker) {
  return {name, marker}
}

function gameFlow() {
  let gameboard = createBoard()
  let player1 = player("player1", "X");
  let player2 = player("player2", "O");
  
  function placeMarker(i) {
    if (gameboard.board.array[i] == "X" || gameboard.board.array[i] == "O") {
      return
    }
      else (gameboard.board.array[i] = player1.marker)
}

return {placeMarker}
}

const game = gameFlow()