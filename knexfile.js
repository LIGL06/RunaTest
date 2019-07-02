require('dotenv')
  .config();

const {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_DATABASE,
  PG_PASSWORD,
  NODE_ENV
} = process.env;

const env = NODE_ENV || 'development';

const config = {
  [env]: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: PG_HOST,
      port: PG_PORT,
      user: PG_USER,
      password: PG_PASSWORD,
      database: PG_DATABASE,
      charset: 'utf8',
      multipleStatements: true,
      timezone: '-06:00'
    },
    pool: {},
    acquireConnectionTimeout: 10000,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

module.exports = config;
