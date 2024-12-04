const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningsPositions = [
  [0, 1, 4],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// let's create function to initialize a game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  newGameBtn.classList.remove("Active");
  gameInfo.innerText = `Current Player is - ${currentPlayer}`;
}

function swapTurn() {
  if (currentPlayer == "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player is - ${currentPlayer}`;
}

function checkWinner() {
  let answer = "";

  winningsPositions.forEach((position) => {
    if (
      ((gameGrid[position[0] !== ""] ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
        gameGrid[position[0]] === gameGrid[position[1]]) ||
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "0";
      }

      boxes[position[0]].classList.add("win");
      boxes[position[0]].classList.add("win");
      boxes[position[0]].classList.add("win");
    }
  });
}

initGame();

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;

    //swap player
    swapTurn();

    //check winner
    checkWinner();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
