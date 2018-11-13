import requests
import json

token = 'EAAd3GIyrbFEBABiysZAaBzYREe95f0yvRtK0bbeNk9WrZCP53nFvZBxuQFfnBbud4JgbspxgFp07r6VuUtMYfSgUjz70hVTmfg7f2ZAM7BiIZAXzleN1xKofpVENcZB7pSbrKyeMHN4ev91AAeFZBCRnWYva24IW75o4hNiKwf2wlFKbX13nBOjyxdrYNc5FIPEbi36MN8IegNQ3L8c7ZCcpyNPvC0AYqv8ZD'

events = 'https://graph.facebook.com/v3.2/me?fields=events&access_token=' + token

outputEventResponse = requests.get(events)

outputEventBook = json.loads(outputEventResponse.text)

print(outputEventBook['events']['data'][0]['name'])



# from boards.models import Board
# board = Board.objects.create(name='Python', description='General discussion about Python.')
#
#

