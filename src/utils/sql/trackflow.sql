CREATE TABLE user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY, -- 1=Admin, 2=Company, 3=Employee, 4=Common
    role_name VARCHAR(255) NOT NULL UNIQUE, -- User role name (Admin, Company, etc.)
    permissions JSON NOT NULL,             -- Permissions in JSON format
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,            -- User's name
    email VARCHAR(255) NOT NULL UNIQUE,    -- Unique email
    password_hash VARCHAR(255) NOT NULL,   -- Encrypted password (hash + salt)
    role_id INT NOT NULL,                  -- Relates to `user_roles`
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES user_roles(id) ON DELETE CASCADE
);

CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- Company's name
    corporateReason VARCHAR(255) NOT NULL, -- Corporate reason
    regNumber VARCHAR(14) NOT NULL UNIQUE, -- Unique CNPJ of the company
    employees INT,                         -- Number of employees
    admin_user_id INT NOT NULL,            -- Relates to `users` (admin user)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,                  -- Relates to `users`
    company_id INT NOT NULL,               -- Relates to `companies`
    role VARCHAR(255) NOT NULL,            -- User's role in the company (e.g., Manager, Employee)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);







INSERT INTO user_roles (id, role_name, permissions) VALUES
(1, 'Admin', JSON_OBJECT(
    'canManageEverything', true,
    'canManageCompany', true,
    'canCreateEmployees', true,
    'canModifySimple', true,
    'canAccessMaps', true
)),
(2, 'Company', JSON_OBJECT(
    'canManageEverything', false,
    'canManageCompany', true,
    'canCreateEmployees', true,
    'canModifySimple', false,
    'canAccessMaps', false
)),
(3, 'Employee', JSON_OBJECT(
    'canManageEverything', false,
    'canManageCompany', false,
    'canCreateEmployees', false,
    'canModifySimple', true,
    'canAccessMaps', true
)),
(4, 'Common', JSON_OBJECT(
    'canManageEverything', false,
    'canManageCompany', false,
    'canCreateEmployees', false,
    'canModifySimple', true,
    'canAccessMaps', true
));