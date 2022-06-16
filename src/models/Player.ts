
export class Player {
    whiteSide: boolean;
    humanPlayer: boolean;
    playerName: string;

    constructor(whiteSide: boolean, humanPlayer: boolean, playerName: string) {
        this.whiteSide = whiteSide;
        this.humanPlayer = humanPlayer;
        this.playerName = playerName;
    }
    isWhiteSide(): boolean {
        return this.whiteSide
    }
    isHumanPlayer(): boolean {
        return this.humanPlayer
    }
}
