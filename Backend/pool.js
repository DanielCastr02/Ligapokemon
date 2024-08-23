// import mysql from 'mysql';
// import { promisify } from 'util';

// const pool = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'pokemon'
// });


// pool.query = promisify(pool.query);

// export default pool;

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'danielcastro',
  host: 'localhost',
  database: 'ligapokemon',
  password: '',
  port: 5432, 
});


export default pool;
