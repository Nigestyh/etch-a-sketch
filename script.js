const containerElement = document.getElementById("grid-container");
const canvasBtn = document.getElementById("canvas-btn");
const eraseBtn = document.getElementById("erase-btn");
const resetBtn = document.getElementById("reset-btn");

function createGrid(n) {
  for (let row = 0; row < n; row++) {
    for (let column = 0; column < n; column++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.width = `${500 / n}px`;
      square.style.height = `${500 / n}px`;
      containerElement.appendChild(square);
    }
  }
}

let isDrawing = false;
let currentTool = "paint";

function paint(e) {
  if (!e.target.classList.contains("square")) return;
  e.target.style.backgroundColor = "red";
}
function erase(e) {
  if (!e.target.classList.contains("square")) return;
  e.target.style.backgroundColor = "";
}

containerElement.addEventListener("mousedown", (e) => {
  isDrawing = true;
  if (currentTool === "paint") {
    paint(e);
  } else {
    if (currentTool === "erase") {
      erase(e);
    }
  }
});
containerElement.addEventListener("mouseup", (e) => {
  isDrawing = false;
});
containerElement.addEventListener("mouseover", (e) => {
  if (!isDrawing) return;
  if (currentTool === "paint") {
    paint(e);
  } else {
    if (currentTool === "erase") {
      erase(e);
    }
  }
});

function newCanvas() {
  let gridSquares;

  do {
    const input = prompt(
      "Enter a number of squares for a side for your new grid"
    );

    if (input === null) {
      return;
    }
    gridSquares = Number(input);
    if (!(gridSquares >= 1 && gridSquares <= 64)) {
      alert("Choose a number between 1 - 64");
    }
  } while (!(gridSquares >= 1 && gridSquares <= 64));
  containerElement.replaceChildren();
  createGrid(gridSquares);
}

canvasBtn.addEventListener("click", newCanvas);

createGrid(16);

eraseBtn.addEventListener("click", () => {
  currentTool = "erase";
});
resetBtn.addEventListener("click", () => {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.style.backgroundColor = "";
  });
});
