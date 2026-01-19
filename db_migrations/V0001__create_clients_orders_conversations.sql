-- Таблица клиентов
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заявок
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    service_type VARCHAR(100) NOT NULL,
    description TEXT,
    amount DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица истории диалогов с ботом
CREATE TABLE IF NOT EXISTS bot_conversations (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    message_text TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_clients_telegram_id ON clients(telegram_id);
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_conversations_client_id ON bot_conversations(client_id);

-- Комментарии к таблицам
COMMENT ON TABLE clients IS 'База клиентов с контактными данными';
COMMENT ON TABLE orders IS 'Заявки и заказы клиентов на услуги';
COMMENT ON TABLE bot_conversations IS 'История диалогов клиентов с Telegram ботом';

COMMENT ON COLUMN orders.service_type IS 'Тип услуги: unblock_account, tax_return, fraud_protection, consultation';
COMMENT ON COLUMN orders.status IS 'Статус: new, in_progress, completed, cancelled';
COMMENT ON COLUMN bot_conversations.message_type IS 'Тип сообщения: user или bot';
