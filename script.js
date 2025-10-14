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
  
  let roundState;
  
  function placeMarker(i) {
    console.log(roundState)
    if (roundState) {
      return console.log(`roundState is ${roundState}`)
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
    
    checkWin(currentPlayer, gameboard.board.array, roundState)
    
    switch (currentPlayer) {
      case player1:
        currentPlayer = player2
        break;
      case player2:
        currentPlayer = player1
        break;
    }
    
  }
  
  
  return { placeMarker, tiles}
}

function checkWin(currentPlayer, gameboard, roundState) {
  
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
  
  let checkArr = [];
  
  winningCases.forEach((winCase) => {
    
    winCase.forEach((num) => {
      
      for (const marks of currentPlayer.marks) {
        if (num == marks) {
          checkArr.push(marks)
        }
      }
    })
    
    if (JSON.stringify(winCase) == JSON.stringify(checkArr)) {
      roundState = true;
      console.log(roundState)
      console.log(`${currentPlayer.name} is the winner!`)
    }
    else if (JSON.stringify(winCase) !== JSON.stringify(checkArr)) {
      checkArr = []
    }
    else if (!(gameboard.includes(""))) {
      return console.log("It's a tie")
    }
  })
}

const game = gameFlow()

game.tiles.forEach((tile, i) => {
  tile.addEventListener("click", () => {
    
    game.placeMarker(i)
  })
})