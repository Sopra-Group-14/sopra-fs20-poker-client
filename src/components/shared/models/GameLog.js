/**
 * GameLog model
 */
class GameLog {
    constructor(data = {}) {
        this.transactionNr = null;
        this.gameRound = null;
        this.action = null;
        this.raiseAmount = null;
        this.playerName = null;
        this.playerId = null;
        this.nextPlayerName = null;
        this.nextPlayerId = null;
        this.playerPot = null;
        this.roundOver = null;
        this.gameOver = null;
        this.amountToCall = null;
        this.revealedCards = null;
        this.playerList = null;
        this.winner = null;

        Object.assign(this, data);
    }
}
export default GameLog;
