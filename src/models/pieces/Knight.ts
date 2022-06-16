import { Piece } from "./Piece"
import { Cell } from "../Cell"
import blackLogo from "../../assets/black-knight.png";
import { Board } from "../Board"
import whiteLogo from "../../assets/white-knight.png";

export class Knight extends Piece {
    constructor(white: boolean) {
        super(white);
        this.logo = white ? whiteLogo : blackLogo;
    }
    canMove(board: Board, start: Cell, end: Cell): boolean {
        if (!super.canMove(board, start, end)) return false;

        let x = Math.abs(start.getX() - end.getX())
        let y = Math.abs(start.getY() - end.getY())
        return x * y === 2;
    }

}
