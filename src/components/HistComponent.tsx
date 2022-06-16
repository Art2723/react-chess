import React, { FC } from 'react';
// import { Game } from "../models/Game"
import { Move } from "../models/Move"

interface HistProps {
    movesPlayed: Move[];
    currentMove: Number;
    click: (i: number) => void;
}

const HistComponent: FC<HistProps> = ({ movesPlayed, click, currentMove }) => {
    return (
        <div
            className="history"
        >

                <table>
                    <thead>
                        <tr>
                            <th colSpan={3} onClick={()=> click(-1)}>
                        Moves
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* {game.movesPlayed.map((item, i) => { */}
                    {movesPlayed.map((item, i) => {
                        return <tr key={i} onClick={()=> click(i)} className = {i===currentMove ? "selectedMove": ""}> 
                        {/*     <td> */}
                        {/*         <div>{item.player.whiteSide ? 'white': 'black'} </div> */}
                        {/* </td> */}
                            <td>
                            <div>{i+1} </div>
                            </td>
                            <td>
                            <div>{item.pieceMoved!.constructor.name} </div>
                            </td>
                            <td>
                            <div>{['A', 'B','C','D','E', 'F', 'G', 'H'][item.start.x]}{item.start.y+1} - {['A', 'B','C','D','E', 'F', 'G', 'H'][item.end.x]}{item.end.y +1}</div>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>

        </div>
    );
};

export default HistComponent;

