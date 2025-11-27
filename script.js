function createBoard() {
  let board = {
    array: ["", "", "", "", "", "", "", "", ""]
  }
  return { board }
}

function player(name, marker, marks) {
  return { name, marker, marks }
}

function gameFlow() {
  let gameboard = createBoard()
  let player1 = player("player1", "X", []);
  let player2 = player("player2", "O", []);
  let currentPlayer = player1;
  
  let boardUI = document.querySelector("#board")
  let tiles = document.querySelectorAll(".tiles")
  
  let state = { roundState: false };
  
  function placeMarker(i) {
    
    if (state.roundState == true) {
      return
    }
    else if (gameboard.board.array[i] == "X" || gameboard.board.array[i] == "O") {
      return
    }
    else if (gameboard.board.array[i] == "") {
      gameboard.board.array[i] = currentPlayer.marker
      
      currentPlayer.marks.push(i)
      
      boardUI.children[i].textContent = currentPlayer.marker
    }
    else {
      return
    }
    
    
    checkWin(currentPlayer, gameboard.board.array, state)
    
    console.log(`placeMarker func says ${currentPlayer.name}'s array is ${currentPlayer.marks} and roundState is ${state.roundState}`)
    
    switch (currentPlayer) {
      case player1:
        currentPlayer = player2
        break;
      case player2:
        currentPlayer = player1
        break;
    }
    
  }
  
  
  return { placeMarker, tiles }
}


function checkWin(currentPlayer, gameboard, state) {
  
  const winningCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
  
  let testArr = [];
  
  for (let i = 0; i < winningCases.length; i++) {
    
    if (testArr.length >= 3) {
      
      if(JSON.stringify(testArr) == JSON.stringify(winningCases[i - 1])) {
       
        state.roundState = true
        console.log(`${currentPlayer.name} has won!`)
      }
    }
    else if (!(gameboard.includes(""))) {
      return console.log("tie")
    }
    
    else {testArr = []}
    
    if (state.roundState) {
      return
    }
    
    for (let j = 0; j < winningCases[i].length; j++) {
      
      if (currentPlayer.marks.includes(winningCases[i][j])) {
        
        testArr.push(winningCases[i][j])
        
      }
      
    }
    
  }
}

const game = gameFlow()

game.tiles.forEach((tile, i) => {
  tile.addEventListener("click", () => {
    game.placeMarker(i)
  })
})