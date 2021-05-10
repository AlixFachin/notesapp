const knexLib = require('knex')
const knexConfig = require('../knexfile.js') // have to store the config file in root

const knex = knexLib(knexConfig.development);

module.exports = { knex }