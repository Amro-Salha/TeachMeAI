from django.urls import path
from .views import listCurriculums, showCurriculum, listProblems, showProblems

urlpatterns = [
    path("memory/", listCurriculums, name="listCurriculums"),
    path("<int:id>/", showCurriculum, name="showCurriculums"),
    path("problems/", listProblems, name="listProblems"),
    path("problems/<int:id>/", showProblems, name="showProblems")
]
