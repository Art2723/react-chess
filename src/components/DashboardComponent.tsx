import React, { FC } from 'react';
import { Game } from "../models/Game"

interface DashProps {
    game: Game;
}

const DashboardComponent: FC<DashProps> = ({ game }) => {
    return (
        <div
            className="dashboard"
        >
            <div className={["player2", game.currentTurn === game.players[1] ? "current-player" : ""].join(' ')} >
                <span>
            {game.players[1].playerName}
                </span>
                </div>

<div >
            <div className='killedW'>{game.killedWhite.map((item, i) => {
                return <img key={i} src={item.logo? item.logo:""} alt=""/>})}
            </div>
            <div className='killedB'>{game.killedBlack.map((item, i) => {
                return <img key={i} src={item.logo? item.logo:""} alt=""/>})}
            </div>

</div>
            <div className={["player1", game.currentTurn === game.players[0] ? "current-player" : ""].join(' ')} >
                <span>
            {game.players[0].playerName}
                </span>
                </div>
        </div>
    );
};

export default DashboardComponent;

