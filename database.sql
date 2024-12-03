-- Criar tabela `user_roles`
CREATE TABLE user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE, -- Nome do tipo de usuário (Admin, Empresa, etc.)
    permissions JSON NOT NULL,             -- Permissões em formato JSON
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criar tabela `users`
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,            -- Nome do usuário
    email VARCHAR(255) NOT NULL UNIQUE,    -- Email único
    password_hash VARCHAR(255) NOT NULL,   -- Hash da senha
    password_salt VARCHAR(255) NOT NULL,   -- Salt da senha
    role_id INT NOT NULL,                  -- Relaciona com `user_roles`
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES user_roles(id) ON DELETE CASCADE
);

-- Criar tabela `companies`
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,            -- Nome da empresa
    cnpj VARCHAR(14) NOT NULL UNIQUE,      -- CNPJ único da empresa
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criar tabela `user_company` (Relaciona usuários e empresas)
CREATE TABLE user_company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,                  -- Relaciona com `users`
    company_id INT NOT NULL,               -- Relaciona com `companies`
    role VARCHAR(255) NOT NULL,            -- Papel do usuário na empresa (e.g., Gerente, Funcionário)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);


-- Inserir roles na tabela `user_roles`
INSERT INTO user_roles (role_name, permissions) VALUES
('Admin', '{"can_manage_system": true, "can_manage_employees": true, "can_access_reports": true}'),
('Empresa', '{"can_manage_employees": true, "can_access_reports": true}'),
('Funcionário', '{"can_manage_employees": false, "can_access_reports": true}'),
('Comum', '{"can_manage_employees": false, "can_access_reports": false}');

-- Inserir uma empresa na tabela `companies`
INSERT INTO companies (name, cnpj) VALUES
('Empresa Exemplo', '12345678000195');

-- Inserir usuários na tabela `users`
INSERT INTO users (name, email, password_hash, password_salt, role_id) VALUES
('Admin User', 'admin@exemplo.com', 'hash_admin', 'salt_admin', 1),
('Empresa User', 'empresa@exemplo.com', 'hash_empresa', 'salt_empresa', 2),
('Funcionario User', 'funcionario@exemplo.com', 'hash_funcionario', 'salt_funcionario', 3),
('Usuario Comum', 'comum@exemplo.com', 'hash_comum', 'salt_comum', 4);

-- Relacionar usuários com empresas na tabela `user_company`
INSERT INTO user_company (user_id, company_id, role) VALUES
(2, 1, 'Gerente'),
(3, 1, 'Funcionário');


SELECT u.name AS user_name, r.role_name, c.name AS company_name, uc.role AS company_role
FROM users u
LEFT JOIN user_roles r ON u.role_id = r.id
LEFT JOIN user_company uc ON u.id = uc.user_id
LEFT JOIN companies c ON uc.company_id = c.id;