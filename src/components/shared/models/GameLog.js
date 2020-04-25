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
        this.players = null;
        this.winner = null;
        this.possibleActions = null;
        this.gameName = null;
        this.potAmount = null;
        this.activePlayers = null;
        this.thisPlayersTurn = null;
        this.nextPlayersTurn = null;

        Object.assign(this, data);
    }
}
export default GameLog;
