-- Create `user_roles` table
CREATE TABLE user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE, -- User role name (Admin, Company, etc.)
    permissions JSON NOT NULL,             -- Permissions in JSON format
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create `users` table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,            -- User's name
    email VARCHAR(255) NOT NULL UNIQUE,    -- Unique email
    password_hash VARCHAR(255) NOT NULL,   -- Password hash
    password_salt VARCHAR(255) NOT NULL,   -- Password salt
    role_id INT NOT NULL,                  -- Relates to `user_roles`
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES user_roles(id) ON DELETE CASCADE
);

-- Create `companies` table
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,            -- Company's name
    regNumber VARCHAR(14) NOT NULL UNIQUE,      -- Unique CNPJ of the company
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create `user_company` table (Relates users and companies)
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

-- Insert roles into the `user_roles` table
INSERT INTO user_roles (role_name, permissions) VALUES
('Admin', '{"can_manage_system": true, "can_manage_employees": true, "can_access_reports": true}'),
('Company', '{"can_manage_employees": true, "can_access_reports": true}'),
('Employee', '{"can_manage_employees": false, "can_access_reports": true}'),
('Common', '{"can_manage_employees": false, "can_access_reports": false}');

-- Insert a company into the `companies` table
INSERT INTO companies (name, regNumber) VALUES
('Example Company', '12345678000195');

-- Insert users into the `users` table
INSERT INTO users (name, email, password_hash, password_salt, role_id) VALUES
('Admin User', 'admin@example.com', 'hash_admin', 'salt_admin', 1),
('Company User', 'company@example.com', 'hash_company', 'salt_company', 2),
('Employee User', 'employee@example.com', 'hash_employee', 'salt_employee', 3),
('Common User', 'common@example.com', 'hash_common', 'salt_common', 4);

-- Relate users with companies in the `user_company` table
INSERT INTO user_company (user_id, company_id, role) VALUES
(2, 1, 'Manager'),
(3, 1, 'Employee');

-- Select query to display user details, roles, and company association
SELECT u.name AS user_name, r.role_name, c.name AS company_name, uc.role AS company_role
FROM users u
LEFT JOIN user_roles r ON u.role_id = r.id
LEFT JOIN user_company uc ON u.id = uc.user_id
LEFT JOIN companies c ON uc.company_id = c.id;
