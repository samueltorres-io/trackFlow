
    // Método para validar a senha do usuário durante o login
    validateLogin(inputPassword, callback) {
        // Geramos o hash da senha base inserida pelo usuário
        const inputHash = this.generateHash(inputPassword);

        // Consultamos o salt no banco de dados com o e-mail fornecido
        const query = 'SELECT salt, senha_hash FROM user WHERE email = ?';
        connection.query(query, [this.email], (err, results) => {
            if (err) {
                return callback(err);
            }

            if (results.length === 0) {
                return callback('Usuário não encontrado');
            }

            const { salt, senha_hash } = results[0];

            // Concatenamos o hash da senha base inserida com o salt recuperado
            const inputSenhaHash = `${inputHash}:${salt}`;

            // Comparamos se a senha gerada bate com a senha armazenada
            if (inputSenhaHash === senha_hash) {
                return callback(null, 'Login bem-sucedido');
            } else {
                return callback('Senha incorreta');
            }
        });
    }




            // Agora, podemos simular o login com o mesmo email e senha:
            const loginUser = new User(null, 'john@example.com', 'password123');
            loginUser.validateLogin('password123', (err, result) => {
                if (err) {
                    console.error('Erro no login:', err);
                } else {
                    console.log(result); // Login bem-sucedido
                }
            });
        }
    });