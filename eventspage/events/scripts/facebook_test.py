import requests
import json

token = 'EAAd3GIyrbFEBACZC8I3bQm4jB4OFbm3nPOdgXdBh9Yz4jpZBoHVjKNs1WBW1u8KZBPRCHdr8UvxpkHYrWZAwAyVBmswCzAL3BVqaZBTDbcSBqypP3xy2GYfSBAZCf8hpUEcCKannCLORzgNuhgmzr8yovjOpOe4Mhne60vZBN4724a4JFYiiyZAufYIQ7LZC0bmApiZCWp9daY3sb7xZBDYjl5N'

events = 'https://graph.facebook.com/v3.2/me?fields=events&access_token=' + token

outputEventResponse = requests.get(events)

outputEventBook = json.loads(outputEventResponse.text)

print(outputEventBook['events']['data'][0]['name'])

for i in range(15):
    eventName = outputEventBook['events']['data'][i]['name']
    event = Event.objects.create(name=eventName, description='test')



# from events.models import Board
# event = Board.objects.create(name='Python', description='General discussion about Python.')
#
#



