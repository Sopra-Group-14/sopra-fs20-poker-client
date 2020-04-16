/**
 * Card model
 */
class Card {
    constructor(data = {}) {
        this.mySuit = null;
        this.myRank = null;

        Object.assign(this, data);
    }
}
export default Card;
