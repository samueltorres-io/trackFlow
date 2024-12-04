// Recebe Input do User (Nome, E-mail e Senha)
// Sanatiza os Dados
// Cria um Objeto da classe User
// Passa os Atributos sanatizados para o Objeto (name, email, passwd, roleId)
// Envia para o DB, criando um novo user
// Inicia a Sessão
// Envia o novo User para a página do Mapa com a sessão ativa

const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../classes/User');
const { connect } = require('./db');
const router = express.Router();

router.post('/signup', [
    // Validação e sanitização dos campos
    body('name').trim().escape().isLength({ min: 1 }).withMessage('Nome é obrigatório'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Email inválido'),
    body('password').trim().isLength({ min: 8 }).escape().withMessage('Senha deve ter no mínimo 8 caracteres')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    
    async function saveCommomUser(user) {
        const connection = await connect();
        const user = new User(name, email, password, 4); // 4 = Permissão de usuário comum

        user.generatePasswd((err, senhaHash) => {
            if (err) {
                console.error('Erro ao gerar a senha:', err);
                // envia para a página de registro novamente.
            } else {
                // Faz a inserção do novo usuário no banco de dados na tabela user inserindo esses dados:
                // user (
                //     id INT AUTO_INCREMENT PRIMARY KEY,
                //     name VARCHAR(255) NOT NULL,            -- User's name
                //     email VARCHAR(255) NOT NULL UNIQUE,    -- Unique email
                //     password_hash VARCHAR(255) NOT NULL,   -- Password hash
                //     password_salt VARCHAR(255) NOT NULL,   -- Password salt
                //     role_id INT NOT NULL,                  -- Relates to `user_roles`
                //     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                //     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                //     FOREIGN KEY (role_id) REFERENCES user_roles(id) ON DELETE CASCADE
                // );
                const sql = 'INSERT INTO users (name, email, password, roleId, salt, hash, passwd_hash) VALUES (?, ?, ?, ?, ?, ?, ?)';
                const values = [user.name, user.email, user.password, user.roleId, user.salt, user.hash, user.passwd_hash];
                await connection.execute(sql, values);
                console.log('Usuário salvo com sucesso!');
                saveUser(user).catch(console.error);

                // Depois de inserir com sucesso, devemos iniciar a sessão com express session e enviar o user para a página map.html

    }

    

});

module.exports = router;