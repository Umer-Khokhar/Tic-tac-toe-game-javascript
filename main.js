import "./style.css";

const xClass = "x";
const circleClass = "circle";
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMsg = document.getElementById("winning-msg");
const winningText = document.querySelector("[data-winning-text]");
const btn = document.getElementById("restart");
let circleTruns;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

btn.addEventListener("click", startGame);
startGame();
function startGame() {
  circleTruns = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(xClass)
    cell.classList.remove(circleClass)
    cell.addEventListener("click", handleClick, { once: true });
  });
  boardHover();
  winningMsg.classList.remove('show')
}

function handleClick(e) {
  // Check for marks
  const cell = e.target;
  const currentClass = circleTruns ? circleClass : xClass;
  placemark(cell, currentClass);
  // Check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true)
  } else {
    // Switch truns
    swapTruns();
    boardHover();
  }

  // Check for draw
}

//placemark function-----------

function placemark(cell, currentClass) {
  cell.classList.add(currentClass);
}

//SwitchTruns Function----------

function swapTruns() {
  circleTruns = !circleTruns;
}

// Checking the winner!
function checkWin(currentClass) {
  return winningCombination.some((combo) => {
    return combo.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// EndGame function

function endGame(draw) {
  if (draw) {
    winningText.innerHTML = `Draw!`
  } else {
    winningText.innerHTML = `${circleTruns ? "O 's" : "X 's"} Wins`;
  }
  winningMsg.classList.add("show");
}

// Hover Effect

function boardHover() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);

  if (circleTruns) {
    board.classList.add(circleClass);
  } else {
    board.classList.add(xClass);
  }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}