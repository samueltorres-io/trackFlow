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
    name VARCHAR(64) NOT NULL,             -- Company's name
    corporateReason VARCHAR(255) NOT NULL, -- Corporate reason
    regNumber VARCHAR(14) NOT NULL UNIQUE, -- Unique CNPJ of the company
    employees INT,                         -- Number of employees
    admin_user_id INT NOT NULL,            -- Relates to `users` (admin user)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_user_id) REFERENCES users(id) ON DELETE CASCADE
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