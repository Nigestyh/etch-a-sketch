const containerElement = document.getElementById("grid-container");
const canvasBtn = document.getElementById("canvas-btn");
const eraseBtn = document.getElementById("erase-btn");
const resetBtn = document.getElementById("reset-btn");
const colorOptions = document.getElementById("color-options");

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
let selectedColor;

function paint(e) {
  if (!e.target.classList.contains("square")) return;
  e.target.style.backgroundColor = selectedColor;
}
function erase(e) {
  if (!e.target.classList.contains("square")) return;
  e.target.style.backgroundColor = "";
}

function applyTool(e) {
  if (currentTool === "paint") {
    paint(e);
  } else if (currentTool === "rainbow") {
    e.target.style.backgroundColor = generateRandomColor();
  } else if (currentTool === "erase") {
    erase(e);
  }
}

containerElement.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDrawing = true;
  applyTool(e);
});
containerElement.addEventListener("mouseup", (e) => {
  isDrawing = false;
});
containerElement.addEventListener("mouseover", (e) => {
  if (!isDrawing) return;
  applyTool(e);
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

colorOptions.addEventListener("change", (e) => {
  let value = e.target.value;
  if (value === "rainbow") {
    currentTool = "rainbow";
  } else {
    currentTool = "paint";
    selectedColor = value;
  }
});

function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${blue}, ${green})`;
}
