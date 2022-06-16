import { Piece } from "./Piece"
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";
import { Cell } from "../Cell"
import { Board } from "../Board"

export class Pawn extends Piece {
    
    constructor(white: boolean) {
        super(white);
        this.logo = white ? whiteLogo : blackLogo;
    }
    canMove(board: Board, start: Cell, end: Cell): boolean {
        if (!super.canMove(board, start, end)) return false;

        let x = Math.abs(start.getX() - end.getX())
        let y = start.getY() - end.getY()
        if (this.white && Math.abs(x)===1 && y===-1 && end.getPiece()) return true
        if (!this.white && Math.abs(x)===1 && y===1 && end.getPiece()) return true
        if (this.firstStepDone && this.white && !this.isEnemy(end)) return x===0 && y===-1
        if (this.firstStepDone && !this.white&& !this.isEnemy(end)) return x===0 && y===1
        if (!this.firstStepDone && !this.white&& this.isEmptyVertical(board,start, end)&& !this.isEnemy(end)) return x===0 && (y===1 || y===2)
        if (!this.firstStepDone && this.white&& this.isEmptyVertical(board,start, end)&& !this.isEnemy(end)) return x===0 && (y===-1 || y===-2)
        // add logic for killing
        return false;
    }

}
