import os
import psycopg2
from typing import Optional

def get_db_connection():
    '''Получить подключение к базе данных'''
    return psycopg2.connect(os.environ['DATABASE_URL'])


def get_or_create_client(telegram_id: int, first_name: str, last_name: str = None, username: str = None) -> int:
    '''Получить или создать клиента в БД'''
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Проверяем существование клиента
        cur.execute(
            "SELECT id FROM clients WHERE telegram_id = %s",
            (telegram_id,)
        )
        result = cur.fetchone()
        
        if result:
            client_id = result[0]
            # Обновляем данные клиента
            cur.execute(
                """UPDATE clients 
                   SET first_name = %s, last_name = %s, username = %s, updated_at = CURRENT_TIMESTAMP
                   WHERE id = %s""",
                (first_name, last_name, username, client_id)
            )
        else:
            # Создаём нового клиента
            cur.execute(
                """INSERT INTO clients (telegram_id, first_name, last_name, username)
                   VALUES (%s, %s, %s, %s) RETURNING id""",
                (telegram_id, first_name, last_name, username)
            )
            client_id = cur.fetchone()[0]
        
        conn.commit()
        return client_id
        
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()


def save_conversation(client_id: int, message_text: str, message_type: str = 'user') -> None:
    '''Сохранить сообщение в историю диалогов'''
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute(
            """INSERT INTO bot_conversations (client_id, message_text, message_type)
               VALUES (%s, %s, %s)""",
            (client_id, message_text, message_type)
        )
        conn.commit()
    except:
        conn.rollback()
    finally:
        cur.close()
        conn.close()


def create_order(client_id: int, service_type: str, description: str = None, amount: float = None) -> int:
    '''Создать заявку'''
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute(
            """INSERT INTO orders (client_id, service_type, description, amount, status)
               VALUES (%s, %s, %s, %s, 'new') RETURNING id""",
            (client_id, service_type, description, amount)
        )
        order_id = cur.fetchone()[0]
        conn.commit()
        return order_id
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()
