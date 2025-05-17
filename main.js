const game = document.getElementById("game");
    const message = document.getElementById("message");
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    function renderBoard() {
      game.innerHTML = "";
      board.forEach((val, i) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = val;
        cell.addEventListener("click", () => makeMove(i));
        game.appendChild(cell);
      });
    }

    function makeMove(index) {
      if (!gameActive || board[index]) return;
      board[index] = currentPlayer;
      renderBoard();
      if (checkWinner()) {
        gameActive = false;
        message.textContent = `${currentPlayer} wins! Restarting...`;
        setTimeout(resetGame, 2000);
      } else if (!board.includes("")) {
        gameActive = false;
        message.textContent = `It's a draw! Restarting...`;
        setTimeout(resetGame, 2000);
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }

    function checkWinner() {
      return winningCombos.some(combo => {
        return combo.every(i => board[i] === currentPlayer);
      });
    }

    function resetGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameActive = true;
      message.textContent = "";
      renderBoard();
    }

    renderBoard();