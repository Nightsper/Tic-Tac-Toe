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
  
  let whoFirst = prompt("Who goes first? Enter 1 or 2")
  let currentPlayer;
  
  if (whoFirst == "1") {
    currentPlayer = player1
  }
    else if (whoFirst == "2") {
      currentPlayer = player2
    }
      else (currentPlayer = player1)
  
  function placeMarker(i) {
    if (gameboard.board.array[i] == "X" || gameboard.board.array[i] == "O") {
      return
    }
      else (gameboard.board.array[i] = currentPlayer.marker)
}

return {placeMarker}
}

const game = gameFlow()