const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/controllers/user');
const path = require('path');

const app = express();

// Serve os arq. estáticos na pasta public do express
app.use(express.static(path.join(__dirname, 'public')));

// Config do CSP | Para os erros...
const csp = "default-src 'none'; font-src 'self' http://localhost:3000";

// Middleware para aplicar a CSP | Mover para services/middleware depois de subir função de autenticação!!!
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', csp);
  next();
});

app.use(bodyParser.json());

// Rota de cadastro de um user 
app.use('/user', userRoutes); // Alguma rota está dando conflito com os arquivos public e comunicação com backend.
app.use('/', userRoutes); 


app.get('/', (req, res) => {
    // Define o caminho absoluto para o arquivo index.html
    res.sendFile(path.join(__dirname, 'public', 'login', 'user', 'index.html'));
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});