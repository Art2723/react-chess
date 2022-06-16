import React, { FC, useEffect, useState } from 'react';
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import { Game } from "../models/Game"

interface BoardProps {
    game: Game;
    switchPlayer: () => void;
    // setBoard: (board: Board) => void;
    makeMove: (player: Player, startCell: Cell, endCell: Cell) => boolean;
    currentPlayer: Player;
    // swapPlayer: () => void;
    selectedCell: Cell | null
    setSelectedCell: (c:Cell|null)=> void
}

const BoardComponent: FC<BoardProps> = ({  makeMove, currentPlayer, switchPlayer, game, selectedCell, setSelectedCell}) => {
    // const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    // const [cells_props, setCells_props] = useState<Cell[][]>(game.board.cells);

    function click(cell: Cell) {
        // if (selectedCell && selectedCell !== cell && selectedCell.piece?.canMove(game.board, selectedCell, cell)) {
        if (selectedCell && selectedCell !== cell && cell.available) {
            makeMove(currentPlayer, selectedCell, cell )
            // && selectedCell.piece?.canMove(cell)
            // selectedCell.moveFigure(cell);
            // swapPlayer()
            game.highlightCells(null)
            // game.board.highlightCells(null)
            setSelectedCell(null);
            switchPlayer()
        } else {
            if (cell.piece?.white === currentPlayer.isWhiteSide()) {
            game.highlightCells(cell)
            // game.board.highlightCells(cell)
                setSelectedCell(cell);
            }
        // board.highlightCells(selectedCell)
        // setCells_props([...board.cells])
            // if (cell.figure?.color === currentPlayer?.color) {
            // setSelectedCell(cell);
            // }
        }
    }


    // useEffect(() => {
    //     game.board.highlightCells(selectedCell)
    //     setCells_props([...game.board.cells])
    // }, [selectedCell])
    
    return (
        <div> 
        {/* Move #{game.movesPlayed.length}  {game.status} {game.message} */}


            <div className="board">
                {game.board.cells.slice(0).reverse().map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.getID()}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;

