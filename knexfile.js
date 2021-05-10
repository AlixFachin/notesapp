// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host:"127.0.0.1",
      user: process.env.DB_USER,
      database: process.env.DB_NAME, 
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds/'
    }
  },

};
