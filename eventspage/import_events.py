import requests
import json
from dateutil import parser
from django.utils.dateparse import parse_date
from events.models import Event

token = 'EAAd3GIyrbFEBAHBziaSFmltTf633ApSM311Jh2DhL9NZAj7aXZA4YDZA2ZAqFC0csYjeZC48k9mFRIQt0mvEgdlByNQD9WFZAmPhId9ClAEfqcWkLOdrBre1S9fItayGNN132B4bAPHdHKCZAcMNT7Qq61R0b2mXv4ECNXzIZCkUhRZABRKjEZAEIXdCTKrzZBhgWtSbadb6ZBkZCI3Ry9KozOi7z'
link = 'https://graph.facebook.com/v3.2/100565557630187/events?pretty=0&limit=2000&access_token=' + token
processed = 0

existingEvents = []
eventName = 'a'
descriptionTemp = 'b'
#endTime
latitudeTemp = 0
longitudeTemp = 0
placeName = 'test'
placeLocation_city = 'city'
placeLocation_country = 'country'
placeLocation_street ='street'
placeLocation_zip = 0
idFb = 0

# -----------------------------------------------------------------
# ---------------- Define some useful functions -------------------
# -----------------------------------------------------------------



def querySet_to_list(qs):
    """
    this will return python list<dict>
    """
    return [dict(q) for q in qs]

def getData(link):
    """
    this will return the requested data from server
    """
    outputEventResponse = requests.get(link)
    outputEventBook = json.loads(outputEventResponse.text)
    return outputEventBook

def getExistingObjects():
    """
    this writes the array of existing events
    """
    eventQuerySet = Event.objects.all()
    existingEventBook = querySet_to_list(eventQuerySet.values('name'))
    for i in range(len(existingEventBook)):
        existingEvents.append(existingEventBook[i]['name'])
    return True


# -----------------------------------------------------------------
# ---------------- Here starts the main script --------------------
# -----------------------------------------------------------------

try:
    outputEventBook = getData(link)
except:
    print('error in loading data from facebook database.')

if not getExistingObjects():
    print('error loading existing objects.')


def updateDatabase(outputEventBook,field,i,date=False,layer2=None,layer3=None,layer4=None,layer5=None):

    if date:
        if field in outputEventBook['data'][i]:
            tempd = parser.parse(outputEventBook['data'][i][field])
            return tempd

    elif layer2 == None:      # function
        if field in outputEventBook:
            temp = outputEventBook[field]
            return temp

    elif layer3 == None:    # layer2 function
        if field in outputEventBook[layer2][i]:
            temp = outputEventBook[layer2][i][field]
            return temp
    
    elif layer4 == None:    # layer3 function
        if field in outputEventBook[layer2][i][layer3]:
            temp = outputEventBook[layer2][i][layer3][field]
            return temp

    elif layer5 == None:    # layer4 function
        if field in outputEventBook[layer2][i][layer3][layer4]:
            temp = outputEventBook[layer2][i][layer3][layer4][field]
            return temp

    else:                   # layer5 function
        if field in outputEventBook[layer2][i][layer3][layer4][layer5]:
            temp = outputEventBook[layer2][i][layer3][layer4][layer5][field]
            return temp
    

i = 0
for i in range(len(outputEventBook['data'])):
    # get the name 
    eventName = outputEventBook['data'][i]['name']
    if not eventName in existingEvents:
        # get some stuff
        endTime = updateDatabase(outputEventBook,'end_time',i,True,'data')
        descriptionTemp = updateDatabase(outputEventBook,'description',i,False,'data')
        placeName = updateDatabase(outputEventBook,'name',i,False,'data','place')

        if 'location' in outputEventBook['data'][i]['place']:
            placeLocation_city = updateDatabase(outputEventBook,'city',i,False,'data','place','location')
            placeLocation_country = updateDatabase(outputEventBook,'country',i,False,'data','place','location')
            placeLocation_street = updateDatabase(outputEventBook,'street',i,False,'data','place','location')
            placeLocation_zip = updateDatabase(outputEventBook,'zip',i,False,'data','place','location')
            placeId = updateDatabase(outputEventBook,'id',i,False,'data','place')
            latitudeTemp = updateDatabase(outputEventBook,'latitude',i,False,'data','place','location')
            longitudeTemp = updateDatabase(outputEventBook,'longitude',i,False,'data','place','location')

        startTime = updateDatabase(outputEventBook,'start_time',i,True,'data')
        idFb = updateDatabase(outputEventBook,'if_fb',i,False,'data')

        # write new event to the database
        print('write to database')
        print(type(eventName),type(descriptionTemp),type(endTime),type(latitudeTemp),type(longitudeTemp),type(placeName),type(placeLocation_city),type(placeLocation_country),type(placeLocation_street),type(placeLocation_zip),type(idFb))
        print((eventName),(descriptionTemp),(endTime),(latitudeTemp),(longitudeTemp),(placeName),(placeLocation_city),(placeLocation_country),(placeLocation_street),(placeLocation_zip),(idFb))
        event = Event.objects.create(name=eventName, description=descriptionTemp, end_time = endTime, place_location_latitude = latitudeTemp, place_location_longitude = longitudeTemp, place_name = placeName, place_location_city = placeLocation_city, place_location_country = placeLocation_country, place_location_street = placeLocation_street, place_location_zip = placeLocation_zip, id_fb = idFb)
        processed += 1
    else:
        print(eventName, '---> exists allready.')

print('Entered indo database: ', processed)






# exec(open('import_events.py').read())