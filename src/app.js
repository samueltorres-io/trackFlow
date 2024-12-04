const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware para parsear dados do body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Middleware para as rotas
app.use('/api/auth', authRoutes);

// Configuração do express-session
app.use(session({
    secret: 'X4236x%¨$@#¨%Xxc654#XX¨@%$#dc453#C$%&¨C', // Troque por uma chave segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use `secure: true` em produção com HTTPS
}));

// Configuração para servir arquivos estáticos
app.use(express.static('public'));

module.exports = app;