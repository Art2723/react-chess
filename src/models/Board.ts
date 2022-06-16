import { Cell } from "./Cell";
import { Pawn } from "./pieces/Pawn";
import { King } from "./pieces/King";
import { Queen } from "./pieces/Queen";
import { Bishop } from "./pieces/Bishop";
import { Knight } from "./pieces/Knight";
import { Rook } from "./pieces/Rook";

export class Board {
    cells: Cell[][] = [];

    constructor() {
        this.resetBoard();
    }

    getCell(x: number, y: number): Cell {
        if (x < 0 || x > 7 || y < 0 || y > 7) {
            throw 'x, y out of bound'
        }
        return this.cells[y][x]
    }

    // highlightCells(selectedCell: Cell | null) {
    //     for (let i = 0; i < this.cells.length; i++) {
    //         const row = this.cells[i];
    //         for (let j = 0; j < row.length; j++) {
    //             const target = row[j];
    //             target.available = !!selectedCell?.getPiece()?.canMove(this, selectedCell, target)
    //         }
    //     }
    //     // check for taking 'on the way past'
    //     if (selectedCell?.getPiece()? instanceof Pawn && game.)
    // }

    isCellAttacted (c:Cell) {
        type Result = {
            white: Cell | null,
            black: Cell | null 
        }
        let result={white: null, black: null} as Result;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.cells[i][j].getPiece()?.canMove(this, this.cells[i][j], c)){
                    if (this.cells[i][j].getPiece()!.white){
                        result["white"] = this.cells[i][j];
                    }
                    else {
                        result["black"] = this.cells[i][j];
                    }

                    }
                }



            }
        return result;
    }



    resetBoard() {

        for (let i = 0; i < 8; i++) {
            this.cells[i] = []
            for (let j = 0; j < 8; j++) {
                this.cells[i].push(new Cell(j, i, null));
            }
        }
        this.cells[0][0] = new Cell(0, 0, new Rook(true));
        this.cells[0][7] = new Cell(7, 0, new Rook(true));
        this.cells[0][1] = new Cell(1, 0, new Knight(true));
        this.cells[0][6] = new Cell(6, 0, new Knight(true));
        this.cells[0][2] = new Cell(2, 0, new Bishop(true));
        this.cells[0][5] = new Cell(5, 0, new Bishop(true));
        this.cells[0][3] = new Cell(3, 0, new Queen(true));
        this.cells[0][4] = new Cell(4, 0, new King(true));


        this.cells[7][0] = new Cell(0, 7, new Rook(false));
        this.cells[7][7] = new Cell(7, 7, new Rook(false));
        this.cells[7][1] = new Cell(1, 7, new Knight(false));
        this.cells[7][6] = new Cell(6, 7, new Knight(false));
        this.cells[7][2] = new Cell(2, 7, new Bishop(false));
        this.cells[7][5] = new Cell(5, 7, new Bishop(false));
        this.cells[7][3] = new Cell(3, 7, new Queen(false));
        this.cells[7][4] = new Cell(4, 7, new King(false));


        this.cells[6][0] = new Cell(0, 6, new Pawn(false));
        this.cells[6][7] = new Cell(7, 6, new Pawn(false));
        this.cells[6][1] = new Cell(1, 6, new Pawn(false));
        this.cells[6][6] = new Cell(6, 6, new Pawn(false));
        this.cells[6][2] = new Cell(2, 6, new Pawn(false));
        this.cells[6][5] = new Cell(5, 6, new Pawn(false));
        this.cells[6][3] = new Cell(3, 6, new Pawn(false));
        this.cells[6][4] = new Cell(4, 6, new Pawn(false));


        this.cells[1][0] = new Cell(0, 1, new Pawn(true));
        this.cells[1][7] = new Cell(7, 1, new Pawn(true));
        this.cells[1][1] = new Cell(1, 1, new Pawn(true));
        this.cells[1][6] = new Cell(6, 1, new Pawn(true));
        this.cells[1][2] = new Cell(2, 1, new Pawn(true));
        this.cells[1][5] = new Cell(5, 1, new Pawn(true));
        this.cells[1][3] = new Cell(3, 1, new Pawn(true));
        this.cells[1][4] = new Cell(4, 1, new Pawn(true));

        // for (let i = 2; i < 6; i++){
        //     this.cells[i] = []
        //     for (let j = 0; j < 8; j++) {
        //         this.cells[i].push(new Cell(j,i, null));
        //     }
        // }

    }
}
