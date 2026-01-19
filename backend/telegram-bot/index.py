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
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Получаем обновление от Telegram
    body = json.loads(event.get('body', '{}'))
    
    # Проверяем наличие сообщения
    if 'message' not in body:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True})
        }
    
    message = body['message']
    chat_id = message['chat']['id']
    
    # Приветственное сообщение при /start
    if message.get('text', '').startswith('/start'):
        response_text = "Здравствуйте! Я бот-консультант по финансовым услугам.\n\nЯ помогу вам с:\n- Разблокировкой счетов (5-7 дней)\n- Налоговыми вычетами\n- Защитой от мошенников\n- Консультациями по 115-ФЗ\n\nУ меня 10 лет опыта в банковской системе. Задавайте любые вопросы!\n\nПозвонить: +7 (950) 292-96-07"
        
        try:
            send_telegram_message(chat_id, response_text)
        except:
            pass
            
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True})
        }
    
    # Получаем текст сообщения
    user_message = message.get('text', '')
    
    if not user_message:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True})
        }
    
    # Генерируем ответ через OpenAI
    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
    
    system_prompt = """Ты финансовый консультант с 10-летним опытом работы в банковской системе.

ИНФОРМАЦИЯ О УСЛУГАХ:

**Разблокировка счетов**
- Срок: 5-7 дней
- Стоимость: от 15 000 ₽ до 50 000 ₽
- Работаю со всеми банками
- Специализация: блокировки по 115-ФЗ

**Налоговые вычеты**
- Возврат 13% от расходов
- Помощь со сбором документов
- Подача декларации
- Стоимость: от 5 000 ₽

**Защита от мошенников**
- Консультация по безопасности
- Помощь при краже данных
- Блокировка подозрительных операций

**Диагностика**
- Первичный анализ ситуации
- Разбор за 30 минут
- Стоимость: 5 000 ₽

**Контакты:**
Телефон: +7 (950) 292-96-07

**ПРАВИЛА ОБЩЕНИЯ:**
1. Отвечай кратко и по делу
2. Используй эмодзи для дружелюбности
3. Если клиент заинтересован - предлагай позвонить
4. Не придумывай информацию, которой нет выше
5. Будь профессиональным и вежливым
6. Если не знаешь ответ - предложи позвонить для уточнения"""

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        ai_response = completion.choices[0].message.content
        
        # Отправляем ответ пользователю
        try:
            send_telegram_message(chat_id, ai_response)
        except:
            pass
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True})
        }
        
    except Exception as e:
        try:
            error_message = "Извините, произошла ошибка. Пожалуйста, позвоните: +7 (950) 292-96-07"
            send_telegram_message(chat_id, error_message)
        except:
            pass
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True, 'error': str(e)})
        }


def send_telegram_message(chat_id: int, text: str) -> None:
    '''Отправка сообщения в Telegram'''
    import urllib.request
    
    token = os.environ['TELEGRAM_BOT_TOKEN']
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
    urllib.request.urlopen(req)