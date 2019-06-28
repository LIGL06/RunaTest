import { Database } from '../modules';

const Employee = {
  /**
   * Get all User Data
   * @param condition
   * @returns {*}
   */
  get(condition) {
    return Database.client('employees')
      .where(condition);
  },

  /**
   * Create a new user
   * @param  {Object} parameters User parameters
   * @return {Promise}
   */
  create(parameters) {
    return Database.client('employees')
      .insert(parameters);
  },

};

export default Employee;