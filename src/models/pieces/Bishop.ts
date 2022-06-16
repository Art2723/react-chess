import { Piece } from "./Piece"
import blackLogo from "../../assets/black-bishop.png";
import whiteLogo from "../../assets/white-bishop.png";
import { Cell } from "../Cell"
import { Board } from "../Board"

export class Bishop extends Piece {
    constructor(white: boolean) {
        super(white);
        this.logo = white ? whiteLogo : blackLogo;
    }
    canMove(board: Board, start: Cell, end: Cell): boolean {
        if (!super.canMove(board, start, end)) return false;

        let x = Math.abs(start.getX() - end.getX())
        let y = Math.abs(start.getY() - end.getY())
        if (this.white&& this.isEmptyDiagonal(board,start, end)) return x===y
        if (!this.white&& this.isEmptyDiagonal(board,start, end)) return x===y
        return false;
    }

}
