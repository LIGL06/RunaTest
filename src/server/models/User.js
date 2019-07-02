import { Database } from '../modules';

const User = {
  /**
   * Get all User Data
   * @param condition
   * @returns {*}
   */
  get(condition) {
    return Database.client('users')
      .where(condition);
  },

  /**
   * Create a new user
   * @param  {Object} parameters User parameters
   * @return {Promise}
   */
  create(parameters) {
    return Database.client('users')
      .insert(parameters);
  },

  /**
   * Update an User
   * @param condition
   * @param  {Object} parameters User parameters
   * @return {Promise}
   */
  update(condition, parameters) {
    return Database.client('users')
      .where(condition)
      .update(parameters);
  },

};

export default User;
