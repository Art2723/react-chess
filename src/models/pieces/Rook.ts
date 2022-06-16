import { Piece } from "./Piece"
import { Cell } from "../Cell"
import { Board } from "../Board"
import blackLogo from "../../assets/black-rook.png";
import whiteLogo from "../../assets/white-rook.png";

export class Rook extends Piece {
    constructor(white: boolean) {
        super(white);
        this.logo = white ? whiteLogo : blackLogo;
    }
    canMove(board: Board, start: Cell, end: Cell): boolean {
        if (!super.canMove(board, start, end)) return false;

        let x = Math.abs(start.getX() - end.getX())
        let y = Math.abs(start.getY() - end.getY())
        if  (this.isEmptyHorizontal(board,start, end) || this.isEmptyVertical(board,start, end)) return x===0 || y === 0
        return false;
    }

}
