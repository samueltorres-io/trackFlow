const bcrypt = require('bcrypt'); // Para verificar senhas
const express = require('express');
const router = express.Router();
const db = require('../db'); // Arquivo para lidar com conexões ao banco de dados
const session = require('express-session');

// Middleware para sanitizar entrada
function sanitizeInput(data) {
    if (typeof data === 'string') {
        return data.trim().replace(/[<>\"'%;()&+]/g, '');
    }
    return data;
}

// Login Handler
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se os campos foram preenchidos
        if (!email || !password) {
            return res.status(400).send('Por favor, preencha todos os campos.');
        }

        // Sanitizar entradas
        const sanitizedEmail = sanitizeInput(email);

        // Buscar o usuário no banco de dados
        const userQuery = 'SELECT * FROM users WHERE email = ?';
        const [user] = await db.query(userQuery, [sanitizedEmail]);

        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        // Verificar a senha (adicionar o salt antes de verificar)
        const hashToVerify = password + user.password_salt;
        const passwordMatch = await bcrypt.compare(hashToVerify, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).send('Senha ou email inválidos.');
        }

        // Iniciar sessão do usuário
        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role_id, // Você pode incluir mais dados aqui conforme necessário
        };

        // Redirecionar para a página de mapa
        return res.redirect('/public/map.html');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro interno no servidor.');
    }
});

module.exports = router;
