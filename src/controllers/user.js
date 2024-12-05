const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const connection = require('./db');

// Função para hash de senha
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Rota para registrar um novo usuário
router.post('/register', [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Senha deve ter no mínimo 8 caracteres'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        connection.query(checkUserQuery, [email], async (err, results) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados:', err);
                return res.status(500).json({ message: 'Erro no servidor.' });
            }
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email já está em uso.' });
            }

            const hashedPassword = await hashPassword(password);
            const query = 'INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, ?)';
            const role_id = 4;
            const values = [name, email, hashedPassword, role_id];

            connection.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao salvar usuário:', err);
                    return res.status(500).json({ message: 'Erro ao salvar usuário no banco de dados.' });
                }
                res.status(201).json({ message: 'Usuário criado com sucesso!', userId: result.insertId });
            });
        });
    } catch (err) {
        console.error('Erro inesperado:', err);
        res.status(500).json({ message: 'Erro ao registrar o usuário.' });
    }
});

// Rota para atualizar um usuário
// router.put('/:id', [
//     body('name').optional().notEmpty().withMessage('Nome não pode ser vazio'),
//     body('email').optional().isEmail().withMessage('Email inválido').normalizeEmail(),
//     body('password').optional().isLength({ min: 8 }).withMessage('Senha deve ter no mínimo 8 caracteres'),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email, password } = req.body;
//     const userId = req.params.id;

//     try {
//         let hashedPassword = null;
//         if (password) {
//             hashedPassword = await hashPassword(password);
//         }

//         const query = `
//             UPDATE users 
//             SET name = COALESCE(?, name), 
//                 email = COALESCE(?, email), 
//                 password_hash = COALESCE(?, password_hash) 
//             WHERE id = ?
//         `;
//         const values = [name, email, hashedPassword, userId];

//         connection.query(query, values, (err, results) => {
//             if (err) {
//                 console.error('Erro ao atualizar usuário:', err);
//                 return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
//             }
//             if (results.affectedRows === 0) {
//                 return res.status(404).json({ message: 'Usuário não encontrado.' });
//             }
//             res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
//         });
//     } catch (err) {
//         console.error('Erro inesperado:', err);
//         res.status(500).json({ message: 'Erro ao atualizar o usuário.' });
//     }
// });

module.exports = router;
