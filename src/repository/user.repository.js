import User from "../models/user";

export default class UserRepository {
  static findByPk(userId) {
    return User.findByPk(userId);
  }
}
