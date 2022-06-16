import { Player } from "./Player"
import { Cell } from "./Cell"
import { Piece } from "./pieces/Piece"
import { King } from "./pieces/King"

export class Move {
    player: Player;
    start: Cell;
    end: Cell;
    pieceMoved: Piece | null;
    pieceKilled: Piece | null;
    castlingMove: Boolean;


    constructor(player: Player, start: Cell, end: Cell){
        this.castlingMove = false;
        this.player = player;
        this.start = start;
        this.end = end;
        this.pieceMoved = start.getPiece();
        this.pieceKilled = end.getPiece();
    }
    isCastlingMove() {
        return this.pieceMoved instanceof King && Math.abs(this.start.getX() - this.end.getX())===2;
    }
    directionLeft(){
        return (this.start.getX() - this.end.getX())>0;
    }
}
