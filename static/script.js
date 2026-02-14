let board = Array(8).fill(-1);
let timer = 0;
let timerInterval = null;

const boardDiv = document.getElementById("board");
const conflictsSpan = document.getElementById("conflicts");
const timerSpan = document.getElementById("timer");
const message = document.getElementById("message");

/* =========================
   CREATE 8x8 BOARD
========================= */
if (boardDiv) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            let cell = document.createElement("div");
            cell.classList.add("square");
            cell.classList.add((row + col) % 2 === 0 ? "white" : "gray");

            cell.addEventListener("click", () => placeQueen(row, col));

            boardDiv.appendChild(cell);
        }
    }

    startTimer();
}

/* =========================
   PLACE QUEEN
========================= */
function placeQueen(row, col) {

    if (board[row] === col) {
        board[row] = -1;
    } else {
        board[row] = col;
    }

    render();
    calculateConflicts();
}

/* =========================
   RENDER BOARD
========================= */
function render() {
    const cells = document.querySelectorAll(".square");

    cells.forEach(cell => cell.innerHTML = "");

    for (let row = 0; row < 8; row++) {
        if (board[row] !== -1) {
            let index = row * 8 + board[row];
            cells[index].innerHTML = "♛";
        }
    }
}

/* =========================
   CALCULATE CONFLICTS
========================= */
function calculateConflicts() {

    let conflicts = 0;

    for (let i = 0; i < 8; i++) {
        for (let j = i + 1; j < 8; j++) {

            if (board[i] !== -1 && board[j] !== -1) {

                if (board[i] === board[j]) conflicts++;

                if (Math.abs(i - j) === Math.abs(board[i] - board[j])) conflicts++;
            }
        }
    }

    conflictsSpan.innerText = conflicts;
    checkWin(conflicts);
}

/* =========================
   TIMER
========================= */
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerSpan.innerText = timer;
    }, 1000);
}

/* =========================
   RESET
========================= */
function resetBoard() {
    board = Array(8).fill(-1);
    timer = 0;

    clearInterval(timerInterval);
    startTimer();

    render();
    conflictsSpan.innerText = 0;

    const overlay = document.getElementById("winOverlay");
    if (overlay) overlay.remove();
}

/* =========================
   WIN CHECK (UPDATED)
========================= */
function checkWin(conflicts) {

    const placedQueens = board.filter(col => col !== -1).length;

    if (placedQueens === 8 && conflicts === 0) {
        clearInterval(timerInterval);

        if (!document.getElementById("winOverlay")) {

            // Blur only squares (not overlay)
            const squares = document.querySelectorAll(".square");
            squares.forEach(square => {
                square.style.filter = "blur(3px) brightness(0.7)";
            });

            const overlay = document.createElement("div");
            overlay.innerText = "CONGRATS!";
            overlay.id = "winOverlay";

            overlay.style.position = "absolute";
            overlay.style.top = "50%";
            overlay.style.left = "50%";
            overlay.style.transform = "translate(-50%, -50%)";
            overlay.style.fontSize = "42px";
            overlay.style.fontWeight = "bold";
            overlay.style.fontFamily = "'Oswald', sans-serif";
            overlay.style.color = "black";  // changed to black
            overlay.style.zIndex = "20";

            boardDiv.style.position = "relative";
            boardDiv.appendChild(overlay);
        }

    } else {
        const overlay = document.getElementById("winOverlay");
        if (overlay) overlay.remove();

        // Remove blur from squares
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.style.filter = "none";
        });
    }
}
