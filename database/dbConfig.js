const knex = require('knex');

const knexFile = require('../knexfile.js');

const knexConfig = knex(knexFile.development);

module.exports = knexConfig; 