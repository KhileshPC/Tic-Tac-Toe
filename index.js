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

  //UI box ko empty krne ke liye
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";

    box.classList = `box box${index + 1}`;
  });

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
    // all three boxes should non empty & exactly same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check X is winner
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "0";

      //diable pointer event
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //now X/0 is wiiner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //it means we have winner
  if (answer !== "") {
    gameInfo.innerHTML = `Winner player is ${answer}`;
    newGameBtn.classList.add("active");
    return "";
  }

  //if there is tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });

  if (fillCount === 9) {
    gameInfo.innerText = `Game is Tie`;
    newGameBtn.classList.add("active");
  }
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
