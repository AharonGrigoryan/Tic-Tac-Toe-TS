// computerMove.ts

export function calculateWinner(squares: (string | null)[]): string | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export function getComputerMove(squares: (string | null)[]): number {
    // Check if the computer can win
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            const newSquares = squares.slice();
            newSquares[i] = "O";
            if (calculateWinner(newSquares)) {
                return i;
            }
        }
    }

    // Check if the human player can win and block them
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            const newSquares = squares.slice();
            newSquares[i] = "X";
            if (calculateWinner(newSquares)) {
                return i;
            }
        }
    }

    // Make a random move
    let availableMoves: number[] = [];
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            availableMoves.push(i);
        }
    }

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

