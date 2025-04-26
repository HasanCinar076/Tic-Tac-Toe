const input = require("prompt-sync")();

function playerMove(player, grid) {
    while (true) {
        const x = parseInt(input("Row (1-3): "));
        const y = parseInt(input("Column (1-3): "));

        if (isNaN(x) || x < 1 || x > 3) {
            console.log("Invalid row. Please try again.");
        } else if (isNaN(y) || y < 1 || y > 3) {
            console.log("Invalid column. Please try again.");
        } else if (grid[x - 1][y - 1] !== " ") {
            console.log("Spot already taken. Choose another.");
        } else {
            grid[x - 1][y - 1] = player;
            break;
        }
    }
}

function displayGrid(grid) {
    grid.forEach((row, index) => {
        console.log(row.join(" | "));
        if (index < grid.length - 1) console.log("---------");
    });
}

function hasWinner(grid, player) {
    const winningPatterns = [
        [[0, 0], [0, 1], [0, 2]], // Top row
        [[1, 0], [1, 1], [1, 2]], // Middle row
        [[2, 0], [2, 1], [2, 2]], // Bottom row
        [[0, 0], [1, 0], [2, 0]], // Left column
        [[0, 1], [1, 1], [2, 1]], // Middle column
        [[0, 2], [1, 2], [2, 2]], // Right column
        [[0, 0], [1, 1], [2, 2]], // Diagonal top-left to bottom-right
        [[0, 2], [1, 1], [2, 0]]  // Diagonal top-right to bottom-left
    ];

    return winningPatterns.some(pattern =>
        pattern.every(([r, c]) => grid[r][c] === player)
    );
}

const grid = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
];

let currentPlayer = "X";
let moves = 0;
let winner = false;

displayGrid(grid);
console.log();

while (moves < 9) {
    console.log(`Player ${currentPlayer}, it's your turn.`);
    playerMove(currentPlayer, grid);
    displayGrid(grid);
    console.log();

    if (hasWinner(grid, currentPlayer)) {
        console.log(`Player ${currentPlayer} wins!`);
        winner = true;
        break;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    moves++;
}

if (!winner) {
    console.log("It's a draw!");
}