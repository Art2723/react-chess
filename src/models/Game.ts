import { Player } from "./Player"
import { Board } from "./Board"
import { Cell } from "./Cell"
import { GameStatus } from "./GameStatus"
import { Move } from "./Move"
import { King } from "./pieces/King"
import { Pawn } from "./pieces/Pawn"
import { Queen } from "./pieces/Queen"
import { Piece } from "./pieces/Piece"

export class Game {
    players: Player[] = [];
    board: Board;
    currentTurn: Player;
    status: GameStatus = GameStatus.ACTIVE;
    movesPlayed: Move[] = [];  // for storing full history when jumping to turns
    currentMovesPlayed: Move[] = []; // for current moves, equals to movesPlayed when playing
    killedWhite: Piece[] = [];
    killedBlack: Piece[] = [];
    first: Player;
    message: string = '';


    // constructor(p1: Player, p2: Player, board: Board) {
    // this.init(p1,p2,board)
    // }

    constructor(p1: Player, p2: Player) {
        this.players[0] = p1;
        this.players[1] = p2;
        this.board = new Board();

        this.board.resetBoard();

        if (p1.isWhiteSide()) {
            this.currentTurn = p1;
            this.first=p1
        }
        else {
            this.currentTurn = p2;
            this.first=p2
        }

        this.movesPlayed.length = 0;
    }

    isEnd() {
        return this.getStatus() !== GameStatus.ACTIVE;
    }

    getStatus() {
        return this.status
    }

    setStaus(status: GameStatus) {
        this.status = status;
    }


    highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.board.cells.length; i++) {
            const row = this.board.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.getPiece()?.canMove(this.board, selectedCell, target)
            }
        }
        // check for taking 'on the way past'
        if (selectedCell?.getPiece() instanceof Pawn && this.currentMovesPlayed.length>0 && 
            this.currentMovesPlayed.slice(-1)[0].pieceMoved instanceof Pawn && 
            Math.abs(this.currentMovesPlayed.slice(-1)[0].start.y - this.currentMovesPlayed.slice(-1)[0].end.y)===2 && 
            Math.abs(this.currentMovesPlayed.slice(-1)[0].end.x - selectedCell?.getX()) ===1 && 
            (this.currentMovesPlayed.slice(-1)[0].end.y - selectedCell?.getY())===0){

            let delta = this.currentMovesPlayed.slice(-1)[0].pieceMoved!.white ? -1 : 1
            this.board.cells[this.currentMovesPlayed.slice(-1)[0].end.y + delta][this.currentMovesPlayed.slice(-1)[0].end.x].available = true;

        }
    }

    isTakeOnTheWayPast (m:Move) {
        // almost the same as in highlight above, but still diffetent and common function for both would be too messy
        if (m.pieceMoved instanceof Pawn && this.currentMovesPlayed.length>0 && 
            this.currentMovesPlayed.slice(-1)[0].pieceMoved instanceof Pawn && 
            Math.abs(this.currentMovesPlayed.slice(-1)[0].start.y - this.currentMovesPlayed.slice(-1)[0].end.y)===2 && 
            Math.abs(this.currentMovesPlayed.slice(-1)[0].end.x - m.start.getX()) ===1 && 
            (this.currentMovesPlayed.slice(-1)[0].end.y - m.start.getY())===0 && Math.abs(this.currentMovesPlayed.slice(-1)[0].end.x - m.end.getX()) ===0 && Math.abs(this.currentMovesPlayed.slice(-1)[0].end.y - m.end.getY())===1){
            
            return true;
        }


    }





    makeMove(move: Move, player: Player) {

        this.message = "" 
        // is piece?
        let piece = move.start.getPiece();
        if (!piece) {
            return false;
        }

        // if player valid?
        if (player !== this.currentTurn) {
            return false;
        }
        if (piece!.white !== player.isWhiteSide()){
            return false;
        }

        // is move valid?
        if (this.isTakeOnTheWayPast(move)){
            if (move.pieceMoved!.white){
                this.killedBlack.push(this.board.getCell(move.end.x, move.end.y-1).getPiece()!)
                this.board.getCell(move.end.x, move.end.y-1).setPiece(null)
            } else {
                this.killedWhite.push(this.board.getCell(move.end.x, move.end.y+1).getPiece()!)
                this.board.getCell(move.end.x, move.end.y+1).setPiece(null)
            }  
        } else if (!piece!.canMove(this.board, move.start, move.end)) {
            this.message = 'Wrong move!'
            return false;
        }


        // kill?
        let destPiece = move.end.getPiece();
        if (destPiece) {
            // destPiece.killed = true;
            destPiece.white ? this.killedWhite.push(destPiece) : this.killedBlack.push(destPiece)

        }
            // castling
            if ( move.isCastlingMove() ){
                if ( move.directionLeft() ){
                    // check for Attacked cells on castling route
                    for (let i=0; i<3; i++){
                        if (this.board.isCellAttacted(this.board.getCell(move.start.x-i, move.start.y))[this.currentTurn.isWhiteSide()? "black":"white"]){
                            return false;
                        }
                    }

                // move rook
                    this.board.getCell(move.start.x-1, move.start.y).setPiece(this.board.getCell(0,move.start.y).getPiece())
                    // firststepdone
                    this.board.getCell(0,move.start.y).getPiece()!.firstStepDone = true;
                    this.board.getCell(0,move.start.y).setPiece(null)
                } 
                if ( !move.directionLeft() ){
                    // check for Attacked cells on castling route
                    for (let i=0; i<3; i++){
                        if (this.board.isCellAttacted(this.board.getCell(move.start.x+i, move.start.y))[this.currentTurn.isWhiteSide()? "black":"white"]){
                            return false;
                        }
                    }
                // move rook
                    this.board.getCell(move.start.x+1, move.start.y).setPiece(this.board.getCell(7,move.start.y).getPiece())
                    // firststepdone
                    this.board.getCell(7,move.start.y).getPiece()!.firstStepDone = true;
                    this.board.getCell(7,move.start.y).setPiece(null)
                } 
            }

            // check for Pawn to Queen
            if(move.start.getPiece() instanceof Pawn &&((this.currentTurn.isWhiteSide() && move.end.y===7) ||(!this.currentTurn.isWhiteSide() && move.end.y===0))){
                move.start.setPiece(new Queen(this.currentTurn.isWhiteSide()))
            }

            // move piece
            move.end.setPiece(move.start.getPiece());
            move.start.setPiece(null);

            // check for new check
            for (let i = 0; i<8; i++){
                for (let j = 0; j<8; j++){
                    if (this.board.cells[i][j].getPiece() instanceof King && this.board.cells[i][j].getPiece()?.white !== this.currentTurn.isWhiteSide()) {
                        if ((this.currentTurn.isWhiteSide() && this.board.isCellAttacted(this.board.cells[i][j])["white"]) 
                            ||(!this.currentTurn.isWhiteSide() && this.board.isCellAttacted(this.board.cells[i][j]).black)){

                        this.message = "CHECK!!!"

                    }
                    }
                }
            };     

            // check for old check or wrong move with check
            for (let i = 0; i<8; i++){
                for (let j = 0; j<8; j++){
                    if (this.board.cells[i][j].getPiece() instanceof King && this.board.cells[i][j].getPiece()?.white === this.currentTurn.isWhiteSide()) {
                        if ((this.currentTurn.isWhiteSide() && this.board.isCellAttacted(this.board.cells[i][j])["black"]) 
                            ||(!this.currentTurn.isWhiteSide() && this.board.isCellAttacted(this.board.cells[i][j]).white)){

                        this.moveOnTurn(this.currentMovesPlayed.length-1);
                        this.message = "CHECK!!! Protect your King!!!"
                        return false;

                    }
                    }
                }
            };     

            // store the move
            this.currentMovesPlayed.push(move)
            this.movesPlayed=this.currentMovesPlayed.slice(0)

            // firststepdone
            move.end.getPiece()!.firstStepDone = true;

            // if (destPiece !== null && destPiece instanceof King) {
            //     if (player.isWhiteSide()) {
            //         this.setStaus(GameStatus.WHITE_WIN)
            //     }
            //     else {
            //         this.setStaus(GameStatus.BLACK_WIN)
            //
            //     }
            // }

            // next turn
            this.currentTurn = this.currentTurn === this.players[0] ? this.players[1] : this.players[0]
            return true;
        }

        playerMove(player: Player, startCell: Cell, endCell: Cell){
            // this repackig cells is made for history move as when board resets 
            // new cells created and we need to find them again from x and y
            startCell = this.board.getCell(startCell.x, startCell.y);
            endCell = this.board.getCell(endCell.x, endCell.y);
            let move = new Move(player, startCell, endCell);
            return this.makeMove(move, player)

        }
        moveOnTurn(i:number){
            this.message = "" 
            let movesHist=this.movesPlayed.slice(0)    
            let moves=this.movesPlayed.slice(0,i+1)    
            // this.board = new Board();
            this.board.resetBoard();
            this.currentTurn = moves[0]?.player || this.first;
            this.currentMovesPlayed.length = 0;
            this.killedWhite.length = 0;
            this.killedBlack.length = 0;
            for (let j=0; j<moves.length; j++){
                this.playerMove(moves[j].player, moves[j].start, moves[j].end)
                // this.makeMove(moves[j], moves[j].player)
            }
            this.movesPlayed= movesHist 
        }
    }
