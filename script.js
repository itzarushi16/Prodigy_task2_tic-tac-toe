let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const statusDisplay = document.getElementById('status');
const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetBtn');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const winningMessage = () => `Player ${currentPlayer} has won!`;
const tieMessage = () => `It's a tie!`;
const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;


function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkForResult();
}

function checkForResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = winningMessage();
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusDisplay.textContent = tieMessage();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = currentPlayerTurn();
}


function resetGame() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
  statusDisplay.textContent = currentPlayerTurn();
}


gameBoard.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
