const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',    
    port: 3306,            
    user: 'root',       
    password: 'Benja1275.',        
    database: 'eva2_db'   
});

module.exports = pool;