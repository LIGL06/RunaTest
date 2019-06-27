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
      Database.ping((err) => {
        if (err) return reject(err);
        logger.info(`○ Connected to database at ${PG_HOST}`);
        resolve();
      });
    });
  },

  /**
   * Execute a simple query to test connection
   * @param  {Function} done Done callback
   */
  ping(done) {
    Database.query('SELECT 1', done);
  },

  /**
   * Execute a query onto the connection and handle the different interfaces
   */
  query(sql, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    if (typeof params !== 'undefined' && !Array.isArray(params)) {
      params = [params];
    }
    // Promise interface
    if (typeof callback !== 'function') {
      return Database.client.raw(sql, params);
    }
    // Callback interface
    Database.client.raw(sql, params)
      .asCallback((err, results) => {
        const fields = results ? results[1] : null;
        results = results ? results[0] : null;
        callback(err, results, fields);
      });
  }
};

export default Database;
