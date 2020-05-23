/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.password = null;
    this.token = null;
    this.status = null;
    this.ready = null;
    this.balance = null;
    this.action = null;
    this.hand = null;
    this.playerName =null;
    this.credit=null;
    Object.assign(this, data);
  }
}
export default User;
