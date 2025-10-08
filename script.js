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
}