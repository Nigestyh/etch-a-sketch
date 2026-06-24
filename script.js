const containerElement = document.getElementById("grid-container");

function createGrid() {
  for (let row = 0; row < 16; row++) {
    for (let column = 0; column < 16; column++) {
      const square = document.createElement("div");
      square.classList.add("grid");
      square.style.width = "31px";
      square.style.height = "31px";
      containerElement.appendChild(square);
    }
  }
}
createGrid();

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
