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
    version: '9.6.13',
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
    pool: {
      afterCreate: function (conn, done) {
        conn.query('SET timezone="CDT";', function (err) {
          if (err) {
            done(err, conn);
          } else {
            conn.query('SELECT set_limit(0.01);', function (err) {
              done(err, conn);
            });
          }
        });
      }
    },
    acquireConnectionTimeout: 10000,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

module.exports = config;
