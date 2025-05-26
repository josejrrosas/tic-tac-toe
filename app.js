// IIFE: Immediately Invoked Function Expression
// Used here to encapsulate the game board logic — keeps board and helper functions private
const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""]; // Private empty board array

  // Returns a shallow copy of the board
  // A shallow copy creates a new array with the same primitive values (like strings).
  // This supports encapsulation — prevents direct modification from outside
  function getBoard() {
    return [...board];
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
function player() {
  //   const discordName = "@" + name;
  //   return { name, discordName };
}

// ------------------------------------------------------

const gameController = (function () {})();
