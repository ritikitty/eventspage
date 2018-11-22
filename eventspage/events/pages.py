from django.shortcuts import render, get_object_or_404
from .models import Event

def home(request):
    return render(request, 'home.html',)

def events(request):
    events = Event.objects.all()
    return render(request, 'events.html', {'events': events})

def singleevent(request, pk):
    event = get_object_or_404(Event, pk=pk)
    return render(request, 'singleevent.html', {'event': event})
