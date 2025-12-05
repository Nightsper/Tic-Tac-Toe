function createBoard() {
  let board = {
    array: ["", "", "", "", "", "", "", "", ""]
  }
  return { board }
}

function player(name, marker, marks, score) {
  return { name, marker, marks, score }
}

function gameStart(player1Name, player2Name) {
  
  let gameboard = createBoard();
  
  let player1 = player("player1", "X", [], 0);
  let player2 = player("player2", "O", [], 0);
  let currentPlayer = player1;
  
  let state = { roundState: false };
  
  
  let body = document.querySelector("body");
  
  let startGameTitle = document.querySelector("h1");
  let startGameBox = document.querySelector("#box");
  
  let boardUI = document.createElement("div");
  boardUI.classList.add("board");
  let selectionBox = document.createElement("div");
  selectionBox.id = "selection";
  
  
  let scoreDisplay = document.createElement("div");
  scoreDisplay.id = "score-display"
  
  
  let player1ScoreDisplay = document.createElement("div");
  
  let tieScore = 0;
  let tieScoreDisplay = document.createElement("div");
  tieScoreDisplay.textContent = `Tie: ${tieScore}`
  
  let player2ScoreDisplay = document.createElement("div");
  
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
  
  let winnerDisplay = document.createElement("div");
  winnerDisplay.id = "winner-display";
  
  let winnerDisplayBtns = document.createElement("div");
  winnerDisplayBtns.id = "winner-display-btns"
  
  let restartRoundBtn = document.createElement("button");
  restartRoundBtn.id = "restart-round-btn";
  restartRoundBtn.classList.add("display-winner-btns")
  restartRoundBtn.textContent = "Restart"
  
  let nextRoundBtn = document.createElement("button");
  nextRoundBtn.id = "next-round-btn";
  nextRoundBtn.classList.add("display-winner-btns")
  nextRoundBtn.textContent = "Next Round";
  
  let input1 = document.querySelector("#player1-name");
  let input2 = document.querySelector("#player2-name");
  
  
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
  
  
  function setNames() {
    if (!(input1.value == "")) {
      player1ScoreDisplay.textContent = `${input1.value}'s score: ${player1.score}`
    }
    
    if (!(input2.value == "")) {
      player2ScoreDisplay.textContent = `${input2.value}'s score: ${player2.score}`
    }
    
  };
  
  function placeMarker(i) {
    
    selection.style.display = "none";
    boardUI.classList.add("board-active");
    
    
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
    
    displayWinner(input1, input2)
    
    
    switch (currentPlayer) {
      case player1:
        currentPlayer = player2
        break;
      case player2:
        currentPlayer = player1
        break;
    }
  };
  
  function checkWin(currentPlayer, gameboard, state) {
    
    let winnerDisplay = document.createElement("div");
    
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
    
  };
  
  function displayWinner(input1, input2) {
    
    if (state.roundState == true) {
      winnerDisplay.style.display = "flex";
      nextRoundBtn.style.display = "block";
      if (currentPlayer.name == "player1") {
        winnerDisplay.textContent = `${input1.value} wins`
        boardUI.appendChild(winnerDisplay);
        winnerDisplay.appendChild(winnerDisplayBtns);
        winnerDisplayBtns.appendChild(restartRoundBtn);
        winnerDisplayBtns.appendChild(nextRoundBtn);
      }
      else if (currentPlayer.name == "player2") {
        winnerDisplay.textContent = `${input2.value} wins`
        boardUI.appendChild(winnerDisplay);
        winnerDisplay.appendChild(winnerDisplayBtns);
        winnerDisplayBtns.appendChild(restartRoundBtn);
        winnerDisplayBtns.appendChild(nextRoundBtn);
      }
      
    }
    else if (state.roundState == "tie") {
      winnerDisplay.style.display = "flex";
      nextRoundBtn.style.display = "block";
      winnerDisplay.textContent = `Tied`;
      boardUI.appendChild(winnerDisplay);
      winnerDisplay.appendChild(winnerDisplayBtns);
      winnerDisplayBtns.appendChild(restartRoundBtn);
      winnerDisplayBtns.appendChild(nextRoundBtn);
    }
    
  }
  
  function updateScore(currentPlayer, state) {
    
    if (state.roundState == "tie") {
      tieScore += 1
      
      tieScoreDisplay.textContent = `Tie: ${tieScore}`
    }
    else if (currentPlayer.name == "player1" && state.roundState == true) {
      currentPlayer.score++
      
      setNames()
    }
    else if (currentPlayer.name == "player2" && state.roundState == true) {
      currentPlayer.score++
      
      setNames()
    }
    
  };
  
  function restartRound() {
    
    for (let i = 0; i < gameboard.board.array.length; i++) {
      gameboard.board.array[i] = "";
    };
    
    for (let i = 0; i < boardUI.children.length; i++) {
      boardUI.children[i].textContent = "";
    };
    player1.marks = [];
    player2.marks = [];
    state.roundState = false;
    
    scoreDisplay.style.display = "none";
    boardUI.style.display = "none";
    
    startGameTitle.style.display = "block";
    startGameBox.style.display = "flex";
  };
  
  function nextRound() {
    
    winnerDisplay.style.display = "none";
    selection.style.display = "flex";
    
    for (let i = 0; i < gameboard.board.array.length; i++) {
      gameboard.board.array[i] = "";
    };
    
    for (let i = 0; i < boardUI.children.length; i++) {
      boardUI.children[i].textContent = "";
    };
    player1.marks = [];
    player2.marks = [];
    state.roundState = false;
    currentPlayer = player1;
  };
  
  
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
  
  leftPick.addEventListener("click", function() {
    currentPlayer = player1
    leftPick.classList.add("selected-first-pick");
    rightPick.classList.remove("selected-first-pick");
  })
  
  rightPick.addEventListener("click", function() {
    currentPlayer = player2
    rightPick.classList.add("selected-first-pick");
    leftPick.classList.remove("selected-first-pick");
  })
  
  restartRoundBtn.addEventListener("click", function() {
    restartRound()
  })
  
  nextRoundBtn.addEventListener("click", function() {
    nextRound()
  })
  
  setNames()
}

(function startBtnListener() {
  let title = document.querySelector("h1");
  let box = document.querySelector("#box");
  let startGameBtn = document.querySelector("#start-game-btn");
  let player1Name = document.querySelector("#player1-name");
  let player2Name = document.querySelector("#player2-name");
  
  startGameBtn.addEventListener("click", function() {
    gameStart()
    /*scoreDisplay.style.display = "none";
    boardUI.style.display = "none";*/
    
    title.style.display = "none"
    box.style.display = "none"
  })
})();