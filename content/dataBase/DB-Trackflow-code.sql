CREATE TABLE companies (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE company_details (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    company_id CHAR(36) REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    document VARCHAR(20) UNIQUE NOT NULL, -- Can store CNPJ or CPF
    phones JSON, -- Stores multiple phone numbers as JSON
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE plans (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status JSON, -- JSON field for dynamic statuses (e.g., {"active": true, "new_features": false})
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE company_plans (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    company_id CHAR(36) REFERENCES companies(id) ON DELETE CASCADE,
    plan_id CHAR(36) REFERENCES plans(id) ON DELETE CASCADE,
    subscribed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE support (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    type VARCHAR(50) NOT NULL, -- e.g., "Free", "Premium", "Enterprise"
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE company_support (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    company_id CHAR(36) REFERENCES companies(id) ON DELETE CASCADE,
    support_id CHAR(36) REFERENCES support(id) ON DELETE CASCADE,
    subscribed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE employees (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    company_id CHAR(36) REFERENCES companies(id) ON DELETE CASCADE,
    identifier VARCHAR(12) UNIQUE NOT NULL, -- Custom identifier chosen by the company
    password_hash TEXT NOT NULL,
    status BOOLEAN DEFAULT TRUE, -- Allows enabling/disabling the account
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_details (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) UNIQUE REFERENCES companies(id) ON DELETE CASCADE,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    phones JSON -- Stores multiple phone numbers as JSON
);