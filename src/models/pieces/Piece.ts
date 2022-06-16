import { Board } from "../Board"
import { Cell } from "../Cell"
import logo from "../../assets/white-knight.png";

export class Piece {
    killed: boolean;
    white: boolean;
    logo: typeof logo | null;
    firstStepDone: boolean = false;

    constructor(white: boolean) {
        this.killed = false;
        this.white = white;
        this.logo = null
    }



    isEnemy(target: Cell): boolean {
        if (target.piece) {
            return this.white !== target.piece.white;
        }
        return false;
    }

    isEmptyVertical(board: Board, start: Cell, end: Cell): boolean {
        if (start.x !== end.x) {
            return false;
        }

        const min = Math.min(start.y, end.y);
        const max = Math.max(start.y, end.y);
        for (let y = min + 1; y < max; y++) {
            if (board.getCell(start.x, y).getPiece()) {
                return false
            }
        }
        return true;
    }

    isEmptyHorizontal(board: Board, start: Cell, end: Cell): boolean {
        if (start.y !== end.y) {
            return false;
        }

        const min = Math.min(start.x, end.x);
        const max = Math.max(start.x, end.x);
        for (let x = min + 1; x < max; x++) {
            if (board.getCell(x, end.y).getPiece()) {
                return false
            }
        }
        return true;
    }

    isEmptyDiagonal(board: Board, start: Cell, end: Cell): boolean {
        const absX = Math.abs(end.x - start.x);
        const absY = Math.abs(end.y - start.y);
        if (absY !== absX)
            return false;

        const dy = start.y < end.y ? 1 : -1
        const dx = start.x < end.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if (board.getCell(start.x + dx * i, start.y + dy * i).getPiece())
                return false;
        }
        return true;
    }

    canMove(board: Board, start: Cell, end: Cell): boolean {
        if (end.getPiece()) {
            return !(end.getPiece()!.white === start.getPiece()!.white)
        }
        return true
        // if ( end.getPiece() instanceof King) return false;
    }
}
