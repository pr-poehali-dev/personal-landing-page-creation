import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    '''Создание тестовой заявки в базе данных'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        # Создаём тестового клиента
        cur.execute("""
            INSERT INTO clients (telegram_id, first_name, last_name, username, phone, email)
            VALUES (123456789, 'Тестовый', 'Клиент', 'test_user', '+79001234567', 'test@example.com')
            ON CONFLICT (telegram_id) DO UPDATE 
            SET updated_at = CURRENT_TIMESTAMP
            RETURNING id
        """)
        client_id = cur.fetchone()[0]
        
        # Создаём тестовую заявку
        cur.execute("""
            INSERT INTO orders (client_id, service_type, description, amount, status)
            VALUES (%s, 'unblock_account', 'Заблокировали счёт в Сбербанке по 115-ФЗ. Нужна помощь с разблокировкой.', 25000.00, 'new')
            RETURNING id
        """, (client_id,))
        order_id = cur.fetchone()[0]
        
        # Создаём тестовый диалог
        cur.execute("""
            INSERT INTO bot_conversations (client_id, message_text, message_type)
            VALUES 
                (%s, 'Здравствуйте! У меня заблокировали счёт в банке', 'user'),
                (%s, 'Здравствуйте! Я помогу вам разблокировать счёт. Расскажите подробнее о ситуации', 'bot'),
                (%s, 'Сбербанк заблокировал по 115-ФЗ. Что делать?', 'user'),
                (%s, 'Разблокировка счёта займёт 5-7 дней. Стоимость от 15 000₽ до 50 000₽. Позвоните для консультации: +7 (950) 292-96-07', 'bot')
        """, (client_id, client_id, client_id, client_id))
        
        conn.commit()
        
        # Получаем данные для ответа
        cur.execute("""
            SELECT 
                c.first_name, c.last_name, c.phone, c.email,
                o.service_type, o.description, o.amount, o.status,
                o.created_at
            FROM orders o
            JOIN clients c ON o.client_id = c.id
            WHERE o.id = %s
        """, (order_id,))
        
        result = cur.fetchone()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': 'Тестовая заявка создана!',
                'client_id': client_id,
                'order_id': order_id,
                'data': {
                    'client_name': f"{result[0]} {result[1]}",
                    'phone': result[2],
                    'email': result[3],
                    'service_type': result[4],
                    'description': result[5],
                    'amount': float(result[6]),
                    'status': result[7],
                    'created_at': result[8].isoformat()
                }
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': False,
                'error': str(e)
            }),
            'isBase64Encoded': False
        }
