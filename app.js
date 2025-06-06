// IIFE: Immediately Invoked Function Expression
// Used here to encapsulate the game board logic — keeps board and helper functions private
const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""]; // Private empty board array
  // render board to html
  const render = () => {
    let boardHTML = "";
    board.forEach((cell, index) => {
      boardHTML += `<div class = "cell" id="cell-${index}">${cell}</div>`;
    });
    document.querySelector("#game-board").innerHTML = boardHTML;
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      //grabs id from cell and splits the id to get the index
      const index = parseInt(cell.id.split("-")[1]);
      cell.addEventListener("click", () => {
        GameController.playRound(index);
        Gameboard.render();
      });
    });
  };

  // Returns a shallow copy of the board
  // A shallow copy creates a new array with the same primitive values (like strings).
  // This supports encapsulation — prevents direct modification from outside
  function getBoard() {
    return [...board]; //a copy
  }

  // Places a marker ("X" or "O") at the given index if it's empty
  function markCell(index, marker) {
    if (board[index] === "") {
      board[index] = marker;
      return true; // Valid move, place marker at position
    }
    return false; // Invalid move -cell already occupied
  }

  // Resets the board to all empty strings
  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    console.log("Game board reset.");
  }

  //return functions in an object so we can access them outside of Gameboard
  return {
    getBoard,
    markCell,
    resetBoard,
    render,
  };
})();

// ---------------------------------------------------------
//Create Player Factory
function Player(name, marker) {
  return { name, marker };
}

// ------------------------------------------------------

const GameController = (function () {
  let player1;
  let player2;
  let currentPlayer;
  // startGame(): Initializes the players and sets starting turn
  function startGame(name1, name2) {
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayer = player1;

    Gameboard.resetBoard();
    console.log("Game Started.");
    Gameboard.render();
    DisplayController.setMessage(currentPlayer.name + "'s turn");
    console.log("Current player is:", currentPlayer);
  }

  function switchTurn() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }

  // playRound(index): Processes a move at index
  function playRound(index) {
    //checks to see if move is valid
    if (Gameboard.markCell(index, currentPlayer.marker) === false) {
      DisplayController.setMessage("Invalid Move! Try again " + currentPlayer.name + "!");
      return "Invalid Move";
    }
    //if move is valid check to see if it was a winning move
    const result = checkWinner();
    if (result === "win") {
      DisplayController.setMessage(currentPlayer.name + " wins!");
      return `${currentPlayer.name} wins!`;
    }
    //check to see if valid move was atie
    else if (result === "tie") {
      DisplayController.setMessage("It's a tie!");
      return "It’s a tie!";
    }
    //if not an end gaming move, go to next turn
    else {
      switchTurn();
      DisplayController.setMessage(currentPlayer.name + "'s turn");
      return "Next turn";
    }
  }

  // checkWinner(): Checks if the current player has won
  let winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  function checkWinner() {
    const board = Gameboard.getBoard();
    const marker = currentPlayer.marker;

    //checks every combo and sees if the matching marker position matches the index in the combo
    for (let combo of winCombo) {
      if (combo.every((index) => board[index] === marker)) {
        return "win";
      }
    }

    // If no win, check for tie
    if (board.every((cell) => cell !== "")) {
      return "tie";
    } else {
      return "continue";
    }
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function resetGame() {
    console.log("Game Restarted.");
    Gameboard.resetBoard();
    currentPlayer = player1;
    Gameboard.render();
  }

  return {
    startGame,
    playRound,
    getCurrentPlayer,
    resetGame,
  };
})();

// ------------------------------------------------------

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
  const name1 = document.getElementById('player1').value || "Player 1";
  const name2 = document.getElementById('player2').value || "Player 2";
  
  GameController.startGame(name1, name2);
});


const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
  GameController.resetGame();
});
// ------------------------------------------------------

const DisplayController = (function () {
  const messageElement = document.getElementById("message");

  function setMessage(msg) {
    messageElement.textContent = msg;
  }

  return {
    setMessage,
  };
})();
