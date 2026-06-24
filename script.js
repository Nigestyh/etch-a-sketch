const containerElement = document.getElementById("grid-container");
const canvasBtn = document.getElementById("canvas-btn");

function createGrid(n) {
  for (let row = 0; row < n; row++) {
    for (let column = 0; column < n; column++) {
      const square = document.createElement("div");
      square.classList.add("grid");
      square.style.width = `${500 / n}px`;
      square.style.height = `${500 / n}px`;
      containerElement.appendChild(square);
    }
  }
}

let isDrawing = false;
containerElement.addEventListener("mousedown", (e) => {
  isDrawing = true;

  e.target.style.backgroundColor = "red";
});
containerElement.addEventListener("mouseup", (e) => {
  isDrawing = false;
});
containerElement.addEventListener("mouseover", (e) => {
  if (!isDrawing) return;
  if (e.target.classList.contains("grid")) {
    e.target.style.backgroundColor = "red";
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
