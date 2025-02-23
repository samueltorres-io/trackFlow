const express = require("express");
const db = require("./database");

const app = express();
const port = 8080;


// Testa uma consulta ao banco ao iniciar o servidor
app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT NOW() AS time;");
        res.send(`Banco de dados funcionando! Hora atual no MySQL: ${rows[0].time}`);
    } catch (error) {
        res.status(500).send(`Erro na conexão com o banco: ${error.message}`);
    }
});


app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});