// IIFE: Immediately Invoked Function Expression
// Used here to encapsulate the game board logic — keeps board and helper functions private
const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""]; // Private empty board array

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
  }

  //return functions in an object so we can access them outside of Gameboard
  return {
    getBoard,
    markCell,
    resetBoard,
  };
})();

// ---------------------------------------------------------
//Create Player Factory
function Player(name, marker) {
  return { name, marker };
}

// ------------------------------------------------------

const GameController = (function () {
  // startGame(): Initializes the players and sets starting turn
  let Player1;
  let player2;
  let currentPlayer;
  function startGame(name1,name2, marker1, marker2) {
    const player1 = Player(name1, marker1);
    const player2 = Player(name2, marker2);
    const currentPlayer = player1;

    Gameboard.resetBoard();
  }
  // playRound(index): Processes a move at index

  // checkWinner(): Checks if the current player has won

  // switchTurn(): Changes the active player

  // getCurrentPlayer(): Returns who’s turn it is

  // resetGame(): Resets game and board
})();
