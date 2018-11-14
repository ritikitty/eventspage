import requests
import json
from dateutil import parser

from events.models import Event

token = 'EAAd3GIyrbFEBAB4P17FfWPB98WVMUgsLZANCGiutRZAubj8UyFUAB63fKNQT9l4sNpCmmDVEsZCYcAoyhguoNeBXq7xab2GDSZBBjQqsehScbSOju7PKTe7XeIncHvXXH7SwZBgG86w5ZAxuXLAZC30T0KAkkI816uiR24nRjJzBjUP6GxKkUVT4dFXChLcfurMDPQnuxjrkRuGGCgQmFBP9TFLj4DJeUYZD'

events = 'https://graph.facebook.com/v3.2/me?fields=events&access_token=' + token

outputEventResponse = requests.get(events)

outputEventBook = json.loads(outputEventResponse.text)

print(outputEventBook['events']['data'][0]['name'])
print(parser.parse(outputEventBook['events']['data'][0]['end_time']))

for i in range(15):
    eventName = outputEventBook['events']['data'][i]['name']
    endTime = parser.parse(outputEventBook['events']['data'][i]['end_time'])

    event = Event.objects.create(name=eventName, description='test', end_time = endTime)





