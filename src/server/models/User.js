import { Database } from '../modules';

const User = {
  /**
   * Get all User Data
   * @param condition
   * @returns {*}
   */
  get(condition) {
    return Database.client('user')
      .where(condition);
  },

  /**
   * Create a new user
   * @param  {Object} parameters User parameters
   * @return {Promise}
   */
  create(parameters) {
    return Database.client('user')
      .insert(parameters);
  },

};

export default User;