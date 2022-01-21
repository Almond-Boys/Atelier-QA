const Pool = require('pg').Pool;
// create connection to postgresql database qa

const pool = new Pool({
  host: 'localhost',
  database: 'qa',
  port: 5432,
});

module.exports = pool;
