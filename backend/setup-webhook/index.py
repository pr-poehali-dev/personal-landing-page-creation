import json
import os
import urllib.request

def handler(event: dict, context) -> dict:
    '''Настройка webhook для Telegram бота'''
    
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
    
    token = os.environ['CONSULTANT_BOT_TOKEN']
    webhook_url = 'https://functions.poehali.dev/0a1a2a1c-7f2b-4762-adc9-e522d058c68f'
    
    try:
        # Устанавливаем webhook
        url = f'https://api.telegram.org/bot{token}/setWebhook?url={webhook_url}'
        
        req = urllib.request.Request(url)
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode('utf-8'))
        
        if result.get('ok'):
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Webhook успешно установлен!',
                    'webhook_url': webhook_url,
                    'telegram_response': result
                }),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': result.get('description', 'Неизвестная ошибка'),
                    'telegram_response': result
                }),
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
