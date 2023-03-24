from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('curriculums/', include('memory.urls')),
    # path('', include('djwto.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls')),

]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
