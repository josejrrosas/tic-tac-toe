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
  let Player1;
  let player2;
  let currentPlayer;
  // startGame(): Initializes the players and sets starting turn
  function startGame(name1, name2, marker1, marker2) {
    const player1 = Player(name1, marker1);
    const player2 = Player(name2, marker2);
    const currentPlayer = player1;

    Gameboard.resetBoard();
  }

  // playRound(index): Processes a move at index
function playRound(index) {
    //checks to see if move is valid 
    if (Gameboard.markCell(index, currentPlayer.marker) === false){
        return 'Invalid Move' ;
    }
    //if move is valid check to see if it was a winning move 
    const result = checkWinner();
    if(result === 'win'){
         return `${currentPlayer.name} wins!`;
    }
    //check to see if valid move was atie 
    else if (result === 'tie'){
        return 'It’s a tie!';
    }
    //if not an end gaming move, go to next turn 
    else{
        switchTurn()
        return 'Next turn';
    }
}

  // checkWinner(): Checks if the current player has won
let winCombo = [[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8],[0,4,8], [2,4,6]]
function checkWinner() {
  const board = Gameboard.getBoard();
  const marker = currentPlayer.marker;

//checks every combo and sees if the matching marker position matches the index in the combo 
  for (let combo of winCombo) {
    if (combo.every(index => board[index] === marker)) {
      return 'win';
    }
  }

  // If no win, check for tie
  if (board.every(cell => cell !== '')) {
    return 'tie';
  }

  return 'continue';
}


  // switchTurn(): Changes the active player

  // getCurrentPlayer(): Returns who’s turn it is

  // resetGame(): Resets game and board
})();
