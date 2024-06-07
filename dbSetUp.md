CREATE TABLE IF NOT EXISTS contact_requests (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    tel VARCHAR(100) NOT NULL,
    marketing VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
