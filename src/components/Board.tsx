import React, { useState, useCallback, useEffect } from "react";
import Square from "./Square";
import { getComputerMove } from "../getComputerMove";
import { calculateWinner } from "../getComputerMove";

const Board: React.FC = () => {
  // State for the squares and the current player
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState<boolean>(true);
  // Handle square click
  const handleClick = useCallback(
    (i: number) => {
      if (squares[i] || calculateWinner(squares)) return;
      const newSquares = squares.slice();
      newSquares[i] = isXNext ? "X" : "O";
      setSquares(newSquares);
      setIsXNext(!isXNext);
    },
    [squares, isXNext]
  );
  // Computer move logic
  useEffect(() => {
    if (!isXNext && !calculateWinner(squares)) {
      setTimeout(() => {
        const computerMove = getComputerMove(squares);
        handleClick(computerMove);
      }, 500);
    }
  }, [squares, isXNext, handleClick]);
  // Render a square
  const renderSquare = useCallback(
    (i: number) => {
      return <Square value={squares[i]} onClick={() => handleClick(i)} />;
    },
    [squares, handleClick]
  );
  // Calculate winner and display status
  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;
  // Reset the game
  const reset = useCallback(() => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }, []);

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="reset-button" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default Board;
