import { Database } from '../modules';

const Record = {
  /**
   * Get all Record Data
   * @param condition
   * @returns {*}
   */
  get(condition) {
    return Database.client('records')
      .join('users', 'records.user', 'users.id')
      .where(condition)
      .select('users.legalName', 'records.*')
      .orderBy('records.created_at', 'DESC');
  },

  getLastCheckIn(condition) {
    return Database.client('records')
      .where(condition)
      .orderBy('records.created_at', 'DESC');
  },

  /**
   * Create a new records
   * @param  {Object} parameters Record parameters
   * @return {Promise}
   */
  create(parameters) {
    return Database.client('records')
      .insert(parameters);
  },

};

export default Record;