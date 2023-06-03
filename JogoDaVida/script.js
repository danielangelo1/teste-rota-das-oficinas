document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("grid");
  const size = 20;
  let grid = createGrid(size);
  let intervalId = null;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => toggleCell(i, j));
      gridContainer.appendChild(cell);
    }
  }

  function createGrid(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
      grid[i] = [];
      for (let j = 0; j < size; j++) {
        grid[i][j] = false;
      }
    }
    return grid;
  }

  function toggleCell(row, col) {
    const cell = gridContainer.children[row * size + col];
    grid[row][col] = !grid[row][col];
    cell.classList.toggle("alive");
  }

  function updateGrid() {
    const newGrid = createGrid(size);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const isAlive = grid[i][j];
        const numNeighbors = countNeighbors(i, j);

        if (isAlive) {
          if (numNeighbors < 2 || numNeighbors > 3) {
            newGrid[i][j] = false;
          } else {
            newGrid[i][j] = true; //
          }
        } else {
          if (numNeighbors === 3) {
            newGrid[i][j] = true;
          } else {
            newGrid[i][j] = false;
          }
        }

        const cell = gridContainer.children[i * size + j];
        if (newGrid[i][j] !== grid[i][j]) {
          cell.classList.toggle("alive");
        }
      }
    }

    grid = newGrid;
  }

  function countNeighbors(row, col) {
    let count = 0;

    const neighbors = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1],
    ];

    for (const [neighborRow, neighborCol] of neighbors) {
      if (
        neighborRow >= 0 &&
        neighborRow < size &&
        neighborCol >= 0 &&
        neighborCol < size &&
        grid[neighborRow][neighborCol]
      ) {
        count++;
      }
    }

    return count;
  }

  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const resetButton = document.getElementById("reset");

  startButton.addEventListener("click", startGame);
  stopButton.addEventListener("click", stopGame);
  resetButton.addEventListener("click", resetGame);

  function startGame() {
    intervalId = setInterval(updateGrid, 500);
    startButton.disabled = true;
    stopButton.disabled = false;
  }

  function stopGame() {
    clearInterval(intervalId);
    intervalId = null;
    startButton.disabled = false;
    stopButton.disabled = true;
  }

  function resetGame() {
    stopGame();
    grid = createGrid(size);
    const cells = gridContainer.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      cell.classList.remove("alive");
    }
  }
});
