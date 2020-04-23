/**
 * GameModel model
 */
class GameModel {
    constructor(data = {}) {
        this.gameId = null;
        this.gameName = null;
        this.gameStatus = null;
        this.playerNr = null;
        this.players = null;
        this.bigBlind = null;
        this.smallBlind = null;
        this.gameCreator = null;
        this.hostToken = null;
        this.gameLimit = null;

        Object.assign(this, data);
    }
}
export default GameModel;
