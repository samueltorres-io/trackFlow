require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testando conexão
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute("SELECT NOW() AS time;");
        console.log("✅ Conexão MySQL estabelecida - DB time:", rows[0].time);
        connection.release();
    } catch (error) {
        console.error("❌ Erro ao conectar ao MySQL:", error);
    }
}

// Chama o teste de conexão
testConnection();

// Exporta o pool para ser usado em outros arquivos
module.exports = pool;
