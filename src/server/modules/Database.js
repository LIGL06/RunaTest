import knex from 'knex';
import knexFile from '../../../knexfile';
import logger from './logger';

/**
 * Database module
 * @type {Object}
 */
const Database = {

  /**
   * Initialize the database module
   * @return {Promise}
   */
  init() {
    const { PG_HOST, NODE_ENV } = process.env;
    if (!PG_HOST) throw new Error('Database configuration is not set');

    return new Promise((resolve, reject) => {
      const config = knexFile[NODE_ENV];
      Database.client = knex(config);
      try {
        Database.client.raw("SELECT 1");
      } catch (e) {
        reject(e);
      }
      logger.info(`○ Connected to database at ${ PG_HOST }`);
      resolve();
    });
  }
};

export default Database;
