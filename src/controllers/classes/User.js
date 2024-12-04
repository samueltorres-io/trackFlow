const crypto = require('crypto');
const connection = require('../functions/db'); // Certifique-se de que o caminho está correto

class User {
    constructor(name, email, password, roleId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.roleId = roleId;
        this.salt = null;
        this.hash = null;
        this.senha_hash = null;
    }

    // Gera um salt aleatório de 128 caracteres
    generateSalt() {
        return crypto.randomBytes(64).toString('base64');
    }

    // Gera o hash da senha base (sem o salt)
    generateHash(password) {
        return crypto.createHmac('sha256', '').update(password).digest('hex');
    }

    // Verifica se o salt é único no banco de dados
    verifySalt(callback) {
        const query = 'SELECT COUNT(*) AS total FROM user WHERE salt = ?';
        connection.query(query, [this.salt], (err, results) => {
            if (err) {
                return callback(err);
            }

            if (results[0].total > 0) {
                // Salt já existe, gera outro
                this.salt = this.generateSalt();
                return this.verifySalt(callback); // Verifica novamente
            }

            // Salt é único
            callback(null, this.salt);
        });
    }

    // Gera a senha hash concatenada com salt para criar um novo usuário
    generatePasswd(callback) {
        this.hash = this.generateHash(this.password); // Geramos o hash da senha base sem salt
        this.salt = this.generateSalt(); // Geramos um salt aleatório

        // Verificamos se o salt gerado é único
        this.verifySalt((err) => {
            if (err) {
                return callback(err);
            }

            // Concatenamos o hash com o salt para formar a senha_hash
            this.senha_hash = `${this.hash}:${this.salt}`;
            callback(null, this.senha_hash);
        });
    }
}