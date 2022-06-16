import { Piece } from "./pieces/Piece"

export class Cell {
    piece: Piece | null;
    x: number;
    y: number;
    available: boolean;

    constructor(x: number, y: number, piece: Piece | null) {
        this.x = x;
        this.y = y;
        this.piece = piece;
        this.available = false;
    }
    getPiece(): Piece | null {
        return this.piece
    }
    setPiece(p: Piece | null): void {
        this.piece = p
    }
    getX(): number {
        return this.x
    }
    // setX(x:number): void {
    //     this.x = x
    // }
    getY(): number {
        return this.y
    }
    // setY(y:number): void {
    //     this.y = y
    // }
    getID(): string {
        return this.x + '-' + this.y
    }

    getColor(): string {
        return (this.x + this.y)%2===0 ? "black" : "white"
    }
}
