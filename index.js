const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/controllers/user');
const path = require('path');

const app = express();

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuração da Content Security Policy (CSP)
const csp = "default-src 'none'; font-src 'self' http://localhost:3000";

// Middleware para aplicar a CSP
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', csp);
  next();
});

// Configura o middleware para processar o corpo das requisições
app.use(bodyParser.json());

// Rota para cadastro de usuários (usando o prefixo '/user')
app.use('/user', userRoutes);
app.use('/', userRoutes); // Ou outro prefixo, como '/user'

// Definir o caminho do arquivo index.html
app.get('/', (req, res) => {
    // Define o caminho absoluto para o arquivo index.html
    res.sendFile(path.join(__dirname, 'public', 'login', 'user', 'index.html'));
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});