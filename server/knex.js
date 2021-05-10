const knexLib = require('knex')
const knexConfig = require('../knexfile.js') // have to store the config file in root

const knex = knexLib( process.env.NODE_ENV ? knexConfig.production : knexConfig.development );

module.exports = { knex }