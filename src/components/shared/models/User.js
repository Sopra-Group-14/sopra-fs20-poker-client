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
    this.credit = null;
    this.action = null;
    this.hand = null;
    Object.assign(this, data);
  }
}
export default User;
