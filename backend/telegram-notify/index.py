import json
import os
import urllib.request
import urllib.parse

def handler(event: dict, context) -> dict:
    """Отправка уведомлений о новых заявках в Telegram"""
    
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
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        full_name = body.get('fullName', '')
        email = body.get('email', '')
        tariff = body.get('tariff', '')
        
        tariff_names = {
            'diagnostic': 'Диагностика — 5000₽',
            'basic': 'Базовый — 15000₽',
            'standard': 'Стандарт — 30000₽',
            'premium': 'Премиум — 50000₽'
        }
        tariff_display = tariff_names.get(tariff, tariff)
        
        bot_token = os.environ.get('TG_BOT_TOKEN') or os.environ.get('TELEGRAM_BOT_TOKEN')
        chat_id = os.environ.get('TG_CHAT_ID') or os.environ.get('TELEGRAM_CHAT_ID')
        
        if not bot_token or not chat_id:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Telegram credentials not configured'})
            }
        
        message = f"""🆕 Новая заявка!

👤 ФИО: {full_name}
📧 Email: {email}
💼 Тариф: {tariff_display}"""
        
        telegram_api_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        data = urllib.parse.urlencode({
            'chat_id': chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }).encode('utf-8')
        
        req = urllib.request.Request(telegram_api_url, data=data, method='POST')
        req.add_header('Content-Type', 'application/x-www-form-urlencoded')
        
        with urllib.request.urlopen(req) as response:
            response_data = response.read()
            
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }