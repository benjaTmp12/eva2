const mysql = require('mysql2');
// Se recomienda usar createPool para mejor rendimiento
const pool = mysql.createPool({
  host: '10.32.0.78',
  user: 'root',
  password: 'admin',
  database: 'datadb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
module.exports = pool.promise(); // Exportar como promesas