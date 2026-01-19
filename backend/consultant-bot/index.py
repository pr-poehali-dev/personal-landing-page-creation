import json
import os
from openai import OpenAI

def handler(event: dict, context) -> dict:
    '''Telegram бот-консультант по финансовым услугам'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body = json.loads(event.get('body', '{}'))
    
    if 'message' not in body:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
    
    message = body['message']
    chat_id = message['chat']['id']
    user_name = message['chat'].get('first_name', 'Гость')
    
    if message.get('text', '').startswith('/start'):
        response_text = f"Здравствуйте, {user_name}!\n\nЯ финансовый консультант с 10-летним опытом в банковской системе.\n\nПомогу вам с:\n✓ Разблокировкой счетов (5-7 дней, от 15 000₽)\n✓ Налоговыми вычетами (от 5 000₽)\n✓ Защитой от мошенников\n✓ Консультациями по 115-ФЗ\n\nЗадавайте вопросы, я отвечу!\n\n📞 Связаться: +7 (950) 292-96-07"
        
        send_message(chat_id, response_text)
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
    
    user_message = message.get('text', '')
    
    if not user_message:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
    
    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
    
    system_prompt = """Ты финансовый консультант с 10-летним опытом работы в банковской системе.

УСЛУГИ И ЦЕНЫ:

Разблокировка счетов:
- Срок: 5-7 дней
- Стоимость: 15 000₽ - 50 000₽ (зависит от сложности)
- Работаю со всеми банками России
- Специализация: блокировки по 115-ФЗ (противодействие отмыванию)

Налоговые вычеты:
- Возврат 13% от расходов (лечение, обучение, покупка жилья)
- Помощь со сбором документов и подачей декларации
- Стоимость: от 5 000₽

Защита от мошенников:
- Консультация по безопасности банковских операций
- Помощь при краже данных карты
- Блокировка подозрительных транзакций

Диагностика ситуации:
- Первичный анализ за 30 минут
- Разбор вашей ситуации и план действий
- Стоимость: 5 000₽

Контакты: +7 (950) 292-96-07

СТИЛЬ ОБЩЕНИЯ:
- Отвечай кратко (2-4 предложения)
- Дружелюбно, но профессионально
- Используй простые слова, избегай банковского жаргона
- Если клиент готов к действию - предлагай позвонить
- Если не знаешь точный ответ - предложи обсудить по телефону
- Не придумывай информацию"""

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=400
        )
        
        ai_response = completion.choices[0].message.content
        send_message(chat_id, ai_response)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        error_text = "Произошла ошибка. Позвоните напрямую: +7 (950) 292-96-07"
        send_message(chat_id, error_text)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True, 'error': str(e)}),
            'isBase64Encoded': False
        }


def send_message(chat_id: int, text: str) -> None:
    '''Отправка сообщения в Telegram'''
    import urllib.request
    
    token = os.environ['CONSULTANT_BOT_TOKEN']
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    
    payload = json.dumps({
        'chat_id': chat_id,
        'text': text
    }).encode('utf-8')
    
    req = urllib.request.Request(
        url, 
        data=payload,
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        urllib.request.urlopen(req)
    except:
        pass
