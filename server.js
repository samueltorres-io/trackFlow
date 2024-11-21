const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

// Serve os arquivos estáticos da pasta 'public/'
app.use(express.static(path.join(__dirname,'public')));

// Rota principal para o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});