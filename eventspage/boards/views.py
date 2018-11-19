from django.shortcuts import render, get_object_or_404
from .models import Board


def boards(request):
    board = Board.objects.all()
    return render(request, 'boards.html', {'board': board})

def board_topics(request, pk):
    board = get_object_or_404(Board, pk=pk)
    return render(request, 'topics.html', {'boards': board})