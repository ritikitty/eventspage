"""eventspage URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url
from django.urls import include, path


from boards import views
from events import pages

urlpatterns = [
    url(r'^$', pages.home, name='home'),

    # forum sites
    url(r'^forum/boards/(?P<pk>\d+)/$', views.board_topics, name='board_topics'),
    url(r'^forum/', views.boards, name='boards'),
    
    url(r'^accounts/', include('allauth.urls')),

    # events urls
    url(r'^events/calendar/', pages.calendar, name='calendar'),
    url(r'^events/map/', pages.map, name='map'),
    url(r'^events/(?P<pk>\d+)/$', pages.singleevent, name='singleevent'),
    url(r'^events/', pages.events, name='events'),
    

    url(r'^admin/', admin.site.urls),
]
