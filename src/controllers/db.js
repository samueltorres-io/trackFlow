const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123', // Senha fica em arquivo .env sem subir para rep online
  database: 'trackflow'
});

module.exports = connection;