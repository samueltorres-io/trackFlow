const mysql = require('mysql2/promise');

// Configuração de conexão ao banco de dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'trackflow',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
