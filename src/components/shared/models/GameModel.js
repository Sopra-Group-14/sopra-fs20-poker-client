/**
 * GameModel model
 */
class GameModel {
    constructor(data = {}) {
        this.gameId = null;
        this.gameName = null;
        this.gameStatus = null;
        this.players = null;
        this.bigBlind = null;
        this.smallBlind = null;
        this.gameCreator = null;
        this.hostToken = null;

        Object.assign(this, data);
    }
}
export default GameModel;
