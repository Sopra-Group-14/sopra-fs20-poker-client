/**
 * Card model
 */
class Card {
    constructor(data = {}) {
        this.suit = null;
        this.rank = null;

        Object.assign(this, data);
    }
}
export default Card;
