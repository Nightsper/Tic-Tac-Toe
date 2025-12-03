function createBoard() {
  let board = {
    array: ["", "", "", "", "", "", "", "", ""]
  }
  return { board }
}

function player(name, marker, marks, score) {
  return { name, marker, marks, score }
}

function gameStart() {
  
  function placeMarker(i) {
    
    firstPickBox.style.display = "none";
    firstPickQuestion.style.display = "none";
    
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
    
    checkWin(currentPlayer, gameboard.board.array, state);
    
    updateScore(currentPlayer, state);
    
    switch (currentPlayer) {
      case player1:
        currentPlayer = player2
        break;
      case player2:
        currentPlayer = player1
        break;
    }
  }
  
  function updateScore(currentPlayer, state) {
    
    if (state.roundState == "tie") {
      tieScore += 1
      
      tieScoreDisplay.textContent = `Tie: ${tieScore}`
    }
    else if (currentPlayer.name == "player1" && state.roundState == true) {
      currentPlayer.score++
      
      player1ScoreDisplay.textContent = `player1 score: ${player1.score}`
    }
    else if (currentPlayer.name == "player2" && state.roundState == true) {
      currentPlayer.score++
      
      player2ScoreDisplay.textContent = `player2 score: ${player2.score}`
    }
    
    
  };
  
  function toggle() {
    if (currentPlayer.name == "player1") {
      leftPick.classList.toggle("selected-first-pick");
    }
    else if (currentPlayer.name == "player2") {
      rightPick.classList.toggle("selected-first-pick");
    }
  }
  
  
  let body = document.querySelector("body");
  
  let boardUI = document.createElement("div");
  boardUI.id = "board";
  let selectionBox = document.createElement("div");
  selectionBox.id = "selection";
  
  let gameboard = createBoard();
  
  let player1 = player("player1", "X", [], 0);
  let player2 = player("player2", "O", [], 0);
  let currentPlayer = player1;
  
  
  let scoreDisplay = document.createElement("div");
  scoreDisplay.id = "score-display"
  
  let player1ScoreDisplay = document.createElement("div");
  player1ScoreDisplay.textContent = `player1 score: ${player1.score}`
  
  let tieScore = 0;
  let tieScoreDisplay = document.createElement("div");
  tieScoreDisplay.textContent = `Tie: ${tieScore}`
  
  let player2ScoreDisplay = document.createElement("div");
  player2ScoreDisplay.textContent = `player2 score: ${player2.score}`
  
  let firstPickQuestion = document.createElement("div");
  firstPickQuestion.id = "first-pick-question";
  firstPickQuestion.textContent = "Who goes first?";
  
  let firstPickBox = document.createElement("div");
  firstPickBox.id = "first-pick-box";
  
  let leftPick = document.createElement("div");
  leftPick.textContent = "X";
  leftPick.classList.add("first-picks", "selected-first-pick");
  
  let rightPick = document.createElement("div");
  rightPick.textContent = "O";
  rightPick.classList.add("first-picks");
  
  body.appendChild(scoreDisplay)
  scoreDisplay.appendChild(player1ScoreDisplay);
  scoreDisplay.appendChild(tieScoreDisplay);
  scoreDisplay.appendChild(player2ScoreDisplay);
  body.appendChild(boardUI);
  body.appendChild(selectionBox);
  selectionBox.appendChild(firstPickQuestion)
  selectionBox.appendChild(firstPickBox);
  firstPickBox.appendChild(leftPick);
  firstPickBox.appendChild(rightPick);
  
  let state = { roundState: false };
  
  for (let i = 0; i < 9; i++) {
    let tiles = document.createElement("div");
    tiles.className = "tiles";
    tiles.id = `${i}`
    boardUI.appendChild(tiles)
    
    tiles.addEventListener("click", () => {
      if (currentPlayer.name == "player1") {
        tiles.style.color = ""
      }
      else if (currentPlayer.name == "player2") {
        tiles.style.color = ""
      }
      
      placeMarker(i)
      
    })
  }
  
  leftPick.addEventListener("click", function(e) {
    currentPlayer = player1
    leftPick.classList.add("selected-first-pick");
    rightPick.classList.remove("selected-first-pick");
  })
  
  rightPick.addEventListener("click", function() {
    currentPlayer = player2
    rightPick.classList.add("selected-first-pick");
    leftPick.classList.remove("selected-first-pick");
  })
  
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
    [2, 4, 6],
    []
  ]
  
  let testArr = [];
  let counter = 0;
  
  for (let i = 0; i < winningCases.length; i++) {
    
    if (true) {
      counter++
      if (JSON.stringify(testArr) == JSON.stringify(winningCases[i - 1])) {
        
        state.roundState = true
        console.log(`${currentPlayer.name} has won!`)
        
      }
      if (state.roundState) {
        return
      }
    }
    
    if (!(gameboard.includes("")) && counter > 7) {
      state.roundState = "tie"
      
      return console.log("tie")
    }
    
    else { testArr = [] }
    
    
    for (let j = 0; j < winningCases[i].length; j++) {
      
      if (currentPlayer.marks.includes(winningCases[i][j])) {
        
        testArr.push(winningCases[i][j])
        
      }
      
    }
    
  }
  
}

(function startBtnListener() {
  let gameTitle = document.querySelector("h1");
  let box = document.querySelector("#box");
  let startGameBtn = document.querySelector("#start-game-btn");
  
  startGameBtn.addEventListener("click", function() {
    gameTitle.style.display = "none"
    box.style.display = "none"
    gameStart()
  })
})();