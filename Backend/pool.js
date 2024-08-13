import mysql from 'mysql';
import { promisify } from 'util';

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pokemon'
});


pool.query = promisify(pool.query);

export default pool;