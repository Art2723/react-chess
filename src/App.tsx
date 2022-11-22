import React, { useEffect, useState, useRef } from 'react';

import { Cell } from "./models/Cell";
import { Player } from "./models/Player"
import { Game } from "./models/Game"
import './App.css';
import BoardComponent from "./components/BoardComponent";
import DashboardComponent from "./components/DashboardComponent";
import HistComponent from "./components/HistComponent";
import MessageComponent from "./components/MessageComponent";

function App() {

    const [player1, setPlayer1] = useState(new Player(true, true, 'WHITE'))
    const [player2, setPlayer2] = useState(new Player(false, true, 'BLACK'))
    // const [game, setGame] = useState(new Game(player1, player2))
    const { current: game } = useRef(new Game(player1, player2));
    const [cells, setCells] = useState([...game.board.cells])
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    // const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    // const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player>(game.currentTurn);
    const [, setUpdateRequired] = useState({});
    function switchPlayer() {
        setCurrentPlayer(game.currentTurn)
    }
    function moveOnTurn(i: number) {
        game.moveOnTurn(i)
        setSelectedCell(null)
        setCurrentPlayer(game.currentTurn)
        // setCells(structuredClone(cells))
        // setCells([...game.board.cells])
        setUpdateRequired({});
    }

    // useEffect(() => {
    //     setCells([...game.board.cells])
    // }, [game.board.cells])

    return (
        <div className="app">
            <div className="first-container">
                <span>
                    CHESS
                </span>
            </div>

            <div className="second-container">
            <HistComponent
                // game={game}
                movesPlayed={game.movesPlayed}
                currentMove={game.currentMovesPlayed.length-1}
                click={moveOnTurn}
            />
            <BoardComponent
                game={game}
                // highlightCells={game.highlightCells.bind(game)}
                // cells={cells}
                makeMove={game.playerMove.bind(game)}
                currentPlayer={currentPlayer}
                switchPlayer={() => switchPlayer()}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}

            />
            <DashboardComponent
                game={game}
            />

                   </div>
            <MessageComponent
                game={game}
            />
                   </div>
    )
}

export default App;
