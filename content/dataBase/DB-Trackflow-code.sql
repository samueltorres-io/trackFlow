CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE company_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    document VARCHAR(20) UNIQUE NOT NULL, -- Can store CNPJ or CPF
    phones JSONB, -- Stores multiple phone numbers as JSON
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status JSONB, -- JSON field for dynamic statuses (e.g., {"active": true, "new_features": false})
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE company_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
    subscribed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE support (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL, -- e.g., "Free", "Premium", "Enterprise"
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE company_support (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    support_id UUID REFERENCES support(id) ON DELETE CASCADE,
    subscribed_at TIMESTAMP DEFAULT NOW()
);

-------------------------------------------------------------------------

CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    identifier VARCHAR(12) UNIQUE NOT NULL, -- Custom identifier chosen by the company
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    status BOOLEAN DEFAULT TRUE, -- Allows enabling/disabling the account
    created_at TIMESTAMP DEFAULT NOW()
);

---------------------------------------------------------------------------

CREATE TABLE user_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES companies(id) ON DELETE CASCADE,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    phones JSONB, -- Stores multiple phone numbers as JSON
);