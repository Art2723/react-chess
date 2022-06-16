import { Piece } from "./Piece"
import { Cell } from "../Cell"
import { Board } from "../Board"
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";

export class Queen extends Piece {
    constructor(white: boolean) {
        super(white);
        this.logo = white ? whiteLogo : blackLogo;
    }
    canMove(board: Board, start: Cell, end: Cell): boolean {
        if (!super.canMove(board, start, end)) return false;

        let x = Math.abs(start.getX() - end.getX())
        let y = Math.abs(start.getY() - end.getY())
        if  (this.isEmptyHorizontal(board,start, end) || this.isEmptyVertical(board,start, end) || this.isEmptyDiagonal(board, start, end)) return x === y || (x === 0 || y === 0)
        return false;
    }

}
