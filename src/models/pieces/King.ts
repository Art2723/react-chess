import { Piece } from "./Piece"
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";
import { Cell } from "../Cell"
import { Board } from "../Board"

export class King extends Piece {
    castlingDone: boolean;
    constructor(white: boolean) {
        super(white);
        this.logo = white ? whiteLogo : blackLogo;
        this.castlingDone = false;
    }
    canMove(board: Board, start: Cell, end: Cell): boolean {
        if (!super.canMove(board, start, end)) return false;

        let x = Math.abs(start.getX() - end.getX())
        let y = Math.abs(start.getY() - end.getY())

        if (x===2 && y===0 && !this.castlingDone  && !this.firstStepDone ) {
            if (start.getX()-end.getX()<0 && this.isEmptyHorizontal(board, start, board.getCell(7, end.y)) && !board.getCell(7, end.y).getPiece()?.firstStepDone) {
                return true;

            }
            if (start.getX()-end.getX()>0 && this.isEmptyHorizontal(board, start, board.getCell(0, end.y)) && !board.getCell(0, end.y).getPiece()?.firstStepDone) {
                return true;

            }
        }

        if ((x + y === 1) || (x===y && x===1)) return true;
        return false;
    }

    // isValidCastling(board: Board, start: Cell, end: Cell) {
    //     if (this.castlingDone) return false;
    //     // TODO logic for castling
    // }
}
