from django.shortcuts import render
from .models import Event

def home(request):
    events = Event.objects.all()
    return render(request, 'page.html', {'events': events})