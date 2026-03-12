let board = Array(8).fill(-1);
let timer = 0;
let timerInterval = null;

const boardDiv = document.getElementById("board");
const conflictsSpan = document.getElementById("conflicts");
const timerSpan = document.getElementById("timer");

/* CREATE BOARD */
if (boardDiv) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.classList.add("square");
      cell.classList.add((row + col) % 2 === 0 ? "white" : "gray");
      cell.addEventListener("click", () => placeQueen(row, col));
      boardDiv.appendChild(cell);
    }
  }
  startTimer();
}

/* PLACE QUEEN */
function placeQueen(row, col) {
  if (board[row] === col) board[row] = -1;
  else board[row] = col;
  render();
  calculateConflicts();
}

/* RENDER BOARD */
function render() {
  const cells = document.querySelectorAll(".square");
  cells.forEach(cell => cell.innerHTML = "");
  cells.forEach(cell => cell.style.backgroundColor = "");

  for (let row = 0; row < 8; row++) {
    if (board[row] !== -1) {
      const index = row * 8 + board[row];
      cells[index].innerHTML = "♛";
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (r === row || c === board[row] || Math.abs(r-row) === Math.abs(c-board[row])) {
            const attackIndex = r * 8 + c;
            if (attackIndex !== index) cells[attackIndex].style.backgroundColor = "rgba(255,0,0,0.1)";
          }
        }
      }
    }
  }
}

/* CALCULATE CONFLICTS */
function calculateConflicts() {
  let conflicts = 0;
  for (let i=0; i<8; i++) {
    for (let j=i+1; j<8; j++) {
      if (board[i] !== -1 && board[j] !== -1) {
        if (board[i] === board[j]) conflicts++;
        if (Math.abs(i-j) === Math.abs(board[i]-board[j])) conflicts++;
      }
    }
  }
  conflictsSpan.innerText = conflicts;
  checkWin(conflicts);
}

/* TIMER */
function startTimer() {
  timerInterval = setInterval(() => { timer++; timerSpan.innerText = timer; }, 1000);
}

/* RESET */
function resetBoard() {
  board = Array(8).fill(-1);
  timer = 0;
  clearInterval(timerInterval);
  startTimer();
  render();
  conflictsSpan.innerText = 0;
  const overlay = document.getElementById("winOverlay");
  if (overlay) overlay.remove();
  document.querySelectorAll(".square").forEach(sq => sq.style.filter="none");
  const container = document.getElementById("solutionStepsContainer");
  if (container) container.innerHTML = "";
}

/* WIN CHECK */
function checkWin(conflicts) {
  const placed = board.filter(c => c!==-1).length;
  const squares = document.querySelectorAll(".square");
  if (placed === 8 && conflicts === 0) {
    clearInterval(timerInterval);
    if (!document.getElementById("winOverlay")) {
      squares.forEach(sq => sq.style.filter="blur(3px) brightness(0.7)");
      const overlay = document.createElement("div");
      overlay.innerText = "CONGRATS!";
      overlay.id = "winOverlay";
      overlay.style.position="absolute";
      overlay.style.top="50%";
      overlay.style.left="50%";
      overlay.style.transform="translate(-50%, -50%)";
      overlay.style.fontSize="42px";
      overlay.style.fontWeight="bold";
      overlay.style.fontFamily="'Oswald', sans-serif";
      overlay.style.color="black";
      overlay.style.zIndex="20";
      boardDiv.style.position="relative";
      boardDiv.appendChild(overlay);
    }
  } else {
    const overlay = document.getElementById("winOverlay");
    if (overlay) overlay.remove();
    squares.forEach(sq=>sq.style.filter="none");
  }
}

/* SHOW OPTIMAL SOLUTION */
function showSolution(solution) {
  clearInterval(timerInterval);
  const container = document.getElementById("solutionStepsContainer");
  if (!container) return;
  container.innerHTML = "";
  resetBoard();

  solution.forEach((col, row) => {
    const stepLine = document.createElement("div");
    container.appendChild(stepLine);
    setTimeout(() => {
      board[row] = col;
      render();
      calculateConflicts();
      stepLine.textContent = `Step ${row+1}: Place Queen at Row ${row+1}, Column ${col+1}`;
      stepLine.classList.add("show-step");
    }, row*1500);
  });
}