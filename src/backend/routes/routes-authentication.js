const express = require('express');
const authController = require('../authentication/user-authentication');

const router = express.Router();

// Rota de login
router.post('/login', authController.login);

// Rota de logout
router.post('/logout', authController.logout);

module.exports = router;